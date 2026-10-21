import { setupServer } from 'msw/node';

// API のハンドラーは Phase 2 で追加する
export const server = setupServer();
