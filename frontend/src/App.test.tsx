import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

// テスト環境のセットアップ確認用。Phase 4 で実際のテストに置き換える。
describe('App', () => {
  it('サービス名を表示する', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'ServiceName' }),
    ).toBeInTheDocument();
  });
});
