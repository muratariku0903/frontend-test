import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderApp } from './test/render';

describe('一覧の表示', () => {
  it('サイドバーに全コンテンツが表示され、先頭のコンテンツがメインエリアに表示される', async () => {
    renderApp();

    const sidebar = await screen.findByRole('navigation');
    const items = within(sidebar).getAllByRole('button');
    expect(items.map((item) => item.textContent)).toEqual([
      '坊ちゃん',
      '方丈記',
    ]);
    expect(items[0]).toHaveAttribute('aria-current', 'true');

    const main = screen.getByRole('main');
    expect(
      await within(main).findByRole('heading', { name: '坊ちゃん' }),
    ).toBeInTheDocument();
    expect(
      within(main).getByText('親譲りの無鉄砲で小供の時から損ばかりしている。'),
    ).toBeInTheDocument();
  });
});
