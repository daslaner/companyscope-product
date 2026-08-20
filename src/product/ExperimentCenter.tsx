import { useState } from 'react';
import { analytics } from './analytics';

const experiments = [
  { id: 'activation', metric: 'Activation', hypothesis: 'A decision-first workspace increases first-session shortlist creation.', target: '+12%' },
  { id: 'insight-time', metric: 'Time to insight', hypothesis: 'Explicit lenses reduce time spent comparing irrelevant evidence.', target: '-20%' },
  { id: 'reuse', metric: 'Saved view reuse', hypothesis: 'Persisted decision context increases repeat research sessions.', target: '+15%' },
] as const;

export function ExperimentCenter() {
  const [reviewed, setReviewed] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setReviewed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    analytics.track({ name: 'experiment_reviewed', properties: { experimentId: id } });
  };

  return (
    <section aria-labelledby="experiment-center-title" className="space-y-4">
      <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#b35b2d] dark:text-[#f3a174]">Product learning loop</p><h2 id="experiment-center-title" className="mt-1 text-2xl font-black text-[#28171f] dark:text-white">Experiment center</h2><p className="mt-1 text-sm text-[#725c64] dark:text-[#c7b2bc]">Illustrative hypotheses show how interaction telemetry connects to a product decision, not just a dashboard.</p></div>
      <div className="grid gap-3 lg:grid-cols-3">
        {experiments.map((experiment) => {
          const isReviewed = reviewed.has(experiment.id);
          return <article key={experiment.id} className="rounded-[1.5rem] border border-[#ead8c4] bg-[#fffdf8] p-5 shadow-sm dark:border-[#4d2d43] dark:bg-[#171018]"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.14em] text-[#8a6f77]">{experiment.metric}</p><span className="rounded-full bg-[#f5e5cc] px-2.5 py-1 text-xs font-black text-[#8d461f] dark:bg-[#3a2226] dark:text-[#f0b08c]">Target {experiment.target}</span></div><p className="mt-4 text-sm font-semibold leading-6 text-[#3d2932] dark:text-[#e6d8de]">{experiment.hypothesis}</p><button type="button" aria-pressed={isReviewed} onClick={() => toggle(experiment.id)} className={`mt-5 min-h-10 rounded-xl px-3 text-sm font-bold ${isReviewed ? 'bg-[#5f2548] text-white' : 'border border-[#dcc5ad] text-[#5f2548] dark:border-[#5b394a] dark:text-[#efb6d5]'}`}>{isReviewed ? 'Reviewed' : 'Mark reviewed'}</button></article>;
        })}
      </div>
    </section>
  );
}
