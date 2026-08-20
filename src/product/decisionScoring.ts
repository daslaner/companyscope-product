import type { Company } from '../types/company';

export type DecisionLens = 'balanced' | 'growth' | 'risk' | 'security';

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function decisionScore(company: Company, lens: DecisionLens): number {
  const verifiedBonus = company.verified ? 6 : 0;
  if (lens === 'growth') return clamp(35 + company.growthPct * 1.7 - company.riskScore * 0.25 + company.people.headcountGrowthPct * 0.45 + verifiedBonus);
  if (lens === 'risk') return clamp(105 - company.riskScore * 1.05 + company.security.rating * 0.25 - company.security.criticalFindings * 12 + verifiedBonus);
  if (lens === 'security') return clamp(company.security.rating * 0.75 + company.security.mfaCoveragePct * 0.22 - company.security.openFindings * 2 + verifiedBonus);
  return clamp(42 + company.growthPct * 0.85 - company.riskScore * 0.42 + company.security.rating * 0.32 + verifiedBonus);
}
