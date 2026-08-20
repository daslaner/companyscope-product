import { Link } from 'react-router-dom';
import { CompanyMap } from '../components/CompanyMap';
import { SecurityPanel } from '../components/SecurityPanel';

export function HomePage() {
  return (
    <>
      <main id="main">
        <section className="relative overflow-hidden border-b border-[#ead8c4] dark:border-[#4d2d43]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_10%,rgba(181,91,45,.18),transparent_28%),radial-gradient(circle_at_8%_26%,rgba(95,37,72,.14),transparent_32%),linear-gradient(180deg,#fffaf2,#fffdf8)] dark:bg-[radial-gradient(circle_at_88%_10%,rgba(181,91,45,.18),transparent_28%),radial-gradient(circle_at_8%_26%,rgba(95,37,72,.28),transparent_32%),linear-gradient(180deg,#171018,#120d13)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex rounded-full border border-[#e7cdb2] bg-[#fff3e5] px-3 py-1 text-xs font-black uppercase tracking-[.2em] text-[#a44d24] dark:border-[#58384b] dark:bg-[#2b1722] dark:text-[#f2a16f]">Product engineering showcase</div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-.055em] text-[#28171f] sm:text-6xl dark:text-white">Turn company evidence into an explicit, measurable product decision.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#725c64] dark:text-[#c7b2bc]">CompanyScope Product keeps the same intelligence platform, then adds decision lenses, segments, saved research context and experiment hypotheses so the interface explains not only what users see, but what decision the product is trying to improve.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link className="rounded-full bg-[#5f2548] px-5 py-3 font-black text-white shadow-lg shadow-[#5f2548]/15 transition hover:-translate-y-0.5" to="/register">Open decision workspace</Link><Link className="rounded-full border border-[#dcc5ad] bg-white/70 px-5 py-3 font-black text-[#3d2932] shadow-sm dark:border-[#5b394a] dark:bg-[#21141c] dark:text-white" to="/dashboard">Explore product model</Link></div>
            </div>
            <aside className="rounded-[2rem] border border-[#ead8c4] bg-[#fffdf8] p-6 shadow-xl dark:border-[#4d2d43] dark:bg-[#171018]" aria-label="Decision brief preview">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#b35b2d]">Decision brief</p><h2 className="mt-2 text-2xl font-black text-[#28171f] dark:text-white">Which companies deserve deeper diligence this week?</h2><div className="mt-6 space-y-3">{[['Growth lens','Prioritize momentum and hiring signals'],['Risk-adjusted lens','Trade upside against risk exposure'],['Security lens','Prioritize posture and control maturity']].map(([title,detail],index) => <div key={title} className="flex gap-4 rounded-2xl border border-[#ead8c4] p-4 dark:border-[#4d2d43]"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f5e5cc] font-black text-[#8d461f] dark:bg-[#3a2226] dark:text-[#f0b08c]">{index+1}</span><div><p className="font-black text-[#3d2932] dark:text-white">{title}</p><p className="mt-1 text-sm text-[#8a6f77] dark:text-[#bda8b2]">{detail}</p></div></div>)}</div><p className="mt-5 rounded-2xl bg-[#5f2548] p-4 text-sm leading-6 text-white">The ranking rule is visible and testable. Product analytics capture lens, segment and saved-view decisions rather than generic page views.</p>
            </aside>
          </div>
        </section>
        <section className="mx-auto max-w-7xl space-y-14 px-5 py-14 lg:px-8"><CompanyMap /><SecurityPanel /></section>
      </main>
      <footer className="border-t border-[#ead8c4] px-5 py-8 text-center text-sm text-[#8a6f77] dark:border-[#4d2d43]">CompanyScope Product · Decision-oriented product engineering portfolio</footer>
    </>
  );
}
