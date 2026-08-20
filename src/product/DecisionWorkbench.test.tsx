import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { analytics } from './analytics';
import { DecisionWorkbench } from './DecisionWorkbench';

vi.mock('./analytics', () => ({ analytics: { track: vi.fn() } }));

beforeEach(() => {
  localStorage.clear();
});

describe('DecisionWorkbench', () => {
  it('makes ranking assumptions explicit and persists a decision view', () => {
    render(<MemoryRouter><DecisionWorkbench /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /Rank opportunities/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Growth' }));
    fireEvent.change(screen.getByLabelText('Decision segment'), { target: { value: 'verified' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save decision view' }));
    expect(screen.getByRole('button', { name: 'View saved' })).toBeInTheDocument();
    expect(localStorage.getItem('companyscope.product.decision-view.v1')).toContain('"growth"');
    expect(analytics.track).toHaveBeenCalledWith(expect.objectContaining({ name: 'decision_view_saved' }));
  });

  it('restores a saved lens and segment', () => {
    localStorage.setItem('companyscope.product.decision-view.v1', JSON.stringify({ lens: 'security', segment: 'enterprise' }));
    render(<MemoryRouter><DecisionWorkbench /></MemoryRouter>);
    expect(screen.getByRole('button', { name: 'Security' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Decision segment')).toHaveValue('enterprise');
  });
});
