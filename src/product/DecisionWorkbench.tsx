import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { companies } from '../data/companies';
import { analytics } from './analytics';
import { decisionScore, type DecisionLens } from './decisionScoring';
import { readDecisionView, saveDecisionView, type DecisionSegment } from './decisionViews';

const lenses: ReadonlyArray<[DecisionLens, string]> = [
  ['balanced', 'Balanced'],
  ['growth', 'Growth'],
  ['risk', 'Risk-adjusted'],
  ['security', 'Security'],
];

function matchesSegment(segment: DecisionSegment, company: (typeof companies)[number]) {
  if (segment === 'verified') return company.verified;
  if (segment === 'enterprise') return company.tags.includes('Enterprise');
  if (segment === 'scaleup') return company.tags.includes('Scale-up');
  return true;
}

export function DecisionWorkbench() {
  const initial = useMemo(readDecisionView, []);
  const [lens, setLens] = useState<DecisionLens>(initial.lens);
  const [segment, setSegment] = useState<DecisionSegment>(initial.segment);
  const [saved, setSaved] = useState(false);

  const ranked = useMemo(
    () => companies.filter((company) => matchesSegment(segment, company)).map((company) => ({ company, score: decisionScore(company, lens) })).toSorted((a, b) => b.score - a.score).slice(0, 6),
    [lens, segment],
  );

  const updateLens = (next: DecisionLens) => {
    setLens(next);
    setSaved(false);
    analytics.track({ name: 'decision_lens_changed', properties: { lens: next } });
  };

  const updateSegment = (next: DecisionSegment) => {
    setSegment(next);
    setSaved(false);
    analytics.track({ name: 'decision_segment_changed', properties: { segment: next } });
  };

  const save = () => {
    saveDecisionView({ lens, segment });
    setSaved(true);
    analytics.track({ name: 'decision_view_saved', properties: { lens, segment } });
  };

  return (
    <section aria-labelledby="decision-workbench-title" className="overflow-hidden rounded-[1.75rem] border border-[#ead8c4] bg-[#fffdf8] shadow-sm dark:border-[#4d2d43] dark:bg-[#171018]">
      <div className="border-b border-[#ead8c4] bg-gradient-to-r from-[#fff1dc] via-[#fffaf2] to-[#f8e8ed] p-5 dark:border-[#4d2d43] dark:from-[#2b1722] dark:via-[#171018] dark:to-[#251524]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#a44d24] dark:text-[#f2a16f]">Decision workbench</p><h2 id="decision-workbench-title" className="mt-1 text-2xl font-black tracking-tight text-[#28171f] dark:text-white">Rank opportunities by the question you are answering</h2><p className="mt-1 max-w-3xl text-sm leading-6 text-[#725c64] dark:text-[#c7b2bc]">The same company evidence produces different priorities when the product decision changes. Lens and segment are explicit, measurable inputs rather than hidden ranking assumptions.</p></div>
          <button type="button" onClick={save} className="min-h-11 rounded-xl bg-[#5f2548] px-4 text-sm font-black text-white shadow-sm hover:bg-[#4d1d3a]">{saved ? 'View saved' : 'Save decision view'}</button>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <div><p className="mb-1 text-[11px] font-black uppercase tracking-[.14em] text-[#8a6f77]">Decision lens</p><div role="group" aria-label="Decision lens" className="flex flex-wrap gap-1 rounded-2xl border border-[#e8d4bf] bg-white/70 p-1 dark:border-[#553446] dark:bg-black/10">{lenses.map(([value, label]) => <button key={value} type="button" aria-pressed={lens === value} onClick={() => updateLens(value)} className={`min-h-10 rounded-xl px-3 text-sm font-bold ${lens === value ? 'bg-[#5f2548] text-white' : 'text-[#725c64] hover:bg-[#fff3e5] dark:text-[#d7c5cd] dark:hover:bg-[#2c1a25]'}`}>{label}</button>)}</div></div>
          <label className="text-[11px] font-black uppercase tracking-[.14em] text-[#8a6f77]">Segment<select aria-label="Decision segment" className="field mt-1 min-w-48" value={segment} onChange={(event) => updateSegment(event.target.value as DecisionSegment)}><option value="all">All companies</option><option value="verified">Verified only</option><option value="enterprise">Enterprise</option><option value="scaleup">Scale-up</option></select></label>
        </div>
      </div>

      <div className="grid gap-px bg-[#ead8c4] md:grid-cols-2 xl:grid-cols-3 dark:bg-[#4d2d43]">
        {ranked.map(({ company, score }, index) => (
          <article key={company.id} className="bg-[#fffdf8] p-5 dark:bg-[#171018]">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black text-[#b76635]">#{index + 1} priority</p><h3 className="mt-1 font-black text-[#28171f] dark:text-white"><Link to={`/companies/${company.id}/overview`} onClick={() => analytics.track({ name: 'company_opened', properties: { companyId: company.id, source: 'decision' } })}>{company.name}</Link></h3><p className="mt-1 text-xs text-[#8a6f77]">{company.industry} · {company.countryCode}</p></div><span className="grid size-14 place-items-center rounded-2xl bg-[#5f2548] text-lg font-black text-white" aria-label={`Opportunity score ${score} out of 100`}>{score}</span></div>
            <div className="mt-4 flex flex-wrap gap-2"><Badge tone={company.verified ? 'positive' : 'warning'}>{company.verified ? 'Verified' : 'Review'}</Badge><Badge>{company.growthPct > 0 ? '+' : ''}{company.growthPct}% growth</Badge><Badge>{company.riskScore}/100 risk</Badge></div>
          </article>
        ))}
      </div>
    </section>
  );
}
