import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
const mock = vi.hoisted(() => ({ open: vi.fn().mockResolvedValue(undefined), navigate: vi.fn() }));
vi.mock('@/components/bridge', () => ({
  getBridge: () => ({ files: { openExternal: mock.open } }),
}));
vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-i18next')>()),
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  useSearch: () => ({}),
  useNavigate: () => mock.navigate,
}));
import { SupportSettings } from './support-settings';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it('opens navigation on Pro click and displays company branding', () => {
  render(<SupportSettings />);
  expect(mock.open).not.toHaveBeenCalled();
  expect(screen.getAllByText('深度云创科技').length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('button', { name: 'supportPlans.get_pro' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'supportPlans.get_pro' }));
  expect(mock.open).toHaveBeenCalledWith('https://nav.meding.site');
});
