import { screen, waitFor, within } from '@testing-library/react';
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

describe('本文の編集', () => {
  it('保存すると、メインエリアに反映される', async () => {
    const { user } = renderApp();
    const main = await screen.findByRole('main');
    await within(main).findByRole('heading', { name: '坊ちゃん' });

    await user.click(screen.getByRole('button', { name: '本文を編集' }));
    const textarea = screen.getByRole('textbox', { name: '本文' });
    await user.clear(textarea);
    await user.type(textarea, '新築の二階から首を出していたら、');
    await user.click(screen.getByRole('button', { name: '本文を保存' }));

    expect(
      await within(main).findByText('新築の二階から首を出していたら、'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: '本文' }),
    ).not.toBeInTheDocument();
  });
});

describe('コンテンツの作成', () => {
  it('入力が条件を満たさない間は、保存できない', async () => {
    const { user } = renderApp();
    await user.click(await screen.findByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'New page' }));

    const dialog = screen.getByRole('dialog', { name: 'New page' });
    await user.type(
      within(dialog).getByRole('textbox', { name: 'タイトル' }),
      'あ',
    );
    await user.type(
      within(dialog).getByRole('textbox', { name: '本文' }),
      'あ'.repeat(9),
    );

    expect(
      within(dialog).getByText('本文は10文字以上で入力してください'),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('保存すると一覧に追加され、そのコンテンツが選択される', async () => {
    const { user } = renderApp();
    await user.click(await screen.findByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'New page' }));

    const dialog = screen.getByRole('dialog', { name: 'New page' });
    await user.type(
      within(dialog).getByRole('textbox', { name: 'タイトル' }),
      '羅生門',
    );
    await user.type(
      within(dialog).getByRole('textbox', { name: '本文' }),
      'ある日の暮方の事である。',
    );
    await user.click(within(dialog).getByRole('button', { name: 'Save' }));

    const sidebar = screen.getByRole('navigation');
    expect(
      await within(sidebar).findByRole('button', { name: '羅生門' }),
    ).toHaveAttribute('aria-current', 'true');
    expect(
      await within(screen.getByRole('main')).findByRole('heading', {
        name: '羅生門',
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('コンテンツの削除', () => {
  it('ゴミ箱を押すと一覧から消え、選択中だった場合は先頭のコンテンツが選択される', async () => {
    const { user } = renderApp();
    await user.click(await screen.findByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: '坊ちゃんを削除' }));

    const sidebar = screen.getByRole('navigation');
    await waitFor(() =>
      expect(
        within(sidebar).queryByRole('button', { name: '坊ちゃん' }),
      ).not.toBeInTheDocument(),
    );
    expect(
      within(sidebar).getByRole('button', { name: '方丈記' }),
    ).toHaveAttribute('aria-current', 'true');
    expect(
      await within(screen.getByRole('main')).findByRole('heading', {
        name: '方丈記',
      }),
    ).toBeInTheDocument();
  });
});
