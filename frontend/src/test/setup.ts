import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { resetContents, server } from './server';

// 偽バックエンドにないリクエストは、テストの不備なので失敗させる
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  resetContents();
});
afterAll(() => server.close());
