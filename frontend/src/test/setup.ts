import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { resetContents, server } from './server';

// jsdom は <dialog> の showModal() に対応していないため補う（作成ダイアログで使う）
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};

// 偽バックエンドにないリクエストは、テストの不備なので失敗させる
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetContents();
});
afterAll(() => server.close());
