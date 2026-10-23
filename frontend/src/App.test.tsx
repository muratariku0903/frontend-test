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

describe('タイトルの編集', () => {
  it('保存すると、メインエリアとサイドバーの両方に反映される', async () => {
    const { user } = renderApp();
    const main = await screen.findByRole('main');
    await within(main).findByRole('heading', { name: '坊ちゃん' });

    await user.click(screen.getByRole('button', { name: 'タイトルを編集' }));
    const input = screen.getByRole('textbox', { name: 'タイトル' });
    await user.clear(input);
    await user.type(input, '坊っちゃん');
    await user.click(screen.getByRole('button', { name: 'タイトルを保存' }));

    expect(
      await within(main).findByRole('heading', { name: '坊っちゃん' }),
    ).toBeInTheDocument();
    expect(
      await within(screen.getByRole('navigation')).findByRole('button', {
        name: '坊っちゃん',
      }),
    ).toBeInTheDocument();
  });

  it('Cancel すると、入力を捨てて元のタイトルに戻る', async () => {
    const { user } = renderApp();
    const main = await screen.findByRole('main');
    await within(main).findByRole('heading', { name: '坊ちゃん' });

    await user.click(screen.getByRole('button', { name: 'タイトルを編集' }));
    await user.type(
      screen.getByRole('textbox', { name: 'タイトル' }),
      '（編集中）',
    );
    await user.click(
      screen.getByRole('button', { name: 'タイトルの編集をキャンセル' }),
    );

    expect(
      within(main).getByRole('heading', { name: '坊ちゃん' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: 'タイトル' }),
    ).not.toBeInTheDocument();
  });
});
