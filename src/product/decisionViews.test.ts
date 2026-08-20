import { describe, expect, it, vi } from 'vitest';
import { readDecisionView, saveDecisionView } from './decisionViews';

describe('decision view persistence', () => {
  it('uses safe defaults and persists valid product context', () => {
    localStorage.clear();
    expect(readDecisionView()).toEqual({ lens: 'balanced', segment: 'all' });
    saveDecisionView({ lens: 'security', segment: 'verified' });
    expect(readDecisionView()).toEqual({ lens: 'security', segment: 'verified' });
  });

  it('recovers from malformed storage and unavailable persistence', () => {
    localStorage.setItem('companyscope.product.decision-view.v1', '{broken');
    expect(readDecisionView()).toEqual({ lens: 'balanced', segment: 'all' });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(() => saveDecisionView({ lens: 'growth', segment: 'enterprise' })).not.toThrow();
  });
});
