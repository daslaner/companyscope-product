import { describe, expect, it } from 'vitest';
import { companies } from '../data/companies';
import { decisionScore } from './decisionScoring';

describe('decisionScore', () => {
  it('keeps every decision lens within a normalized 0-100 range', () => {
    const company = companies[0]!;
    for (const lens of ['balanced', 'growth', 'risk', 'security'] as const) {
      expect(decisionScore(company, lens)).toBeGreaterThanOrEqual(0);
      expect(decisionScore(company, lens)).toBeLessThanOrEqual(100);
    }
  });

  it('changes ranking emphasis when the lens changes', () => {
    const company = companies.find((item) => item.growthPct > 20)!;
    expect(decisionScore(company, 'growth')).not.toBe(decisionScore(company, 'security'));
  });
});
