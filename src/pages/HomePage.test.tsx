import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../theme/ThemeProvider';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('communicates the portfolio value proposition and primary actions', () => {
    render(<ThemeProvider><MemoryRouter><HomePage /></MemoryRouter></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Turn company evidence/i);
    expect(screen.getByRole('link', { name: 'Open decision workspace' })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('complementary', { name: 'Decision brief preview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Global company footprint' })).toBeInTheDocument();
  });
});
