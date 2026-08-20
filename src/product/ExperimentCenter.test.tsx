import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { analytics } from './analytics';
import { ExperimentCenter } from './ExperimentCenter';

vi.mock('./analytics', () => ({ analytics: { track: vi.fn() } }));

describe('ExperimentCenter', () => {
  it('turns product hypotheses into reviewable interaction state', () => {
    render(<ExperimentCenter />);
    const buttons = screen.getAllByRole('button', { name: 'Mark reviewed' });
    expect(buttons).toHaveLength(3);
    fireEvent.click(buttons[0]!);
    expect(screen.getByRole('button', { name: 'Reviewed' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Reviewed' }));
    expect(screen.getAllByRole('button', { name: 'Mark reviewed' })).toHaveLength(3);
    expect(analytics.track).toHaveBeenCalledTimes(2);
  });
});
