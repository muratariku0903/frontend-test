const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

/**
 * バックエンドへの共通リクエスト処理。
 * - 2xx 以外は ApiError を投げる
 * - 中身が空のレスポンスは null を返す
 *   （204 のほか、存在しない ID を GET / PUT すると 200 で空が返るため）
 */
export const request = async <T>(
  path: string,
  { method = 'GET', body }: RequestOptions = {},
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    ...(body !== undefined && {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `${method} ${path} が失敗しました（${response.status}）`,
    );
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
};
