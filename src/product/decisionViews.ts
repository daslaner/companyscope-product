import type { DecisionLens } from './decisionScoring';

export type DecisionSegment = 'all' | 'verified' | 'enterprise' | 'scaleup';
export type DecisionView = { lens: DecisionLens; segment: DecisionSegment };

const key = 'companyscope.product.decision-view.v1';

export function readDecisionView(): DecisionView {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}') as Partial<DecisionView>;
    const lens: DecisionLens = ['growth', 'risk', 'security'].includes(parsed.lens ?? '') ? parsed.lens as DecisionLens : 'balanced';
    const segment: DecisionSegment = ['verified', 'enterprise', 'scaleup'].includes(parsed.segment ?? '') ? parsed.segment as DecisionSegment : 'all';
    return { lens, segment };
  } catch {
    return { lens: 'balanced', segment: 'all' };
  }
}

export function saveDecisionView(view: DecisionView): void {
  try {
    localStorage.setItem(key, JSON.stringify(view));
  } catch {
    // The active decision view still works in-memory when storage is unavailable.
  }
}
