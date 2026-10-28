# 実装計画

## 0. 前提整理

### API（NestJS / `localhost:3000`）

| 用途               | エンドポイント                                               |
| ------------------ | ------------------------------------------------------------ |
| サイドバー（一覧） | `GET /content` → `{id, title, body, createdAt, updatedAt}[]` |
| ページ取得         | `GET /content/:id`                                           |
| ページ作成         | `POST /content` `{title?, body?}`                            |
| タイトル／本文編集 | `PUT /content/:id` `{title?, body?}`（片方だけ送れる）       |
| ページ削除         | `DELETE /content/:id` → 204                                  |

### API の注意点

- サイドバー専用 API はなく、一覧 API が本文まで返す。
- 存在しない id を GET / PUT すると、404 ではなく **200 で中身が空**のレスポンスが返る。
- 削除済みの id を DELETE すると **500** が返る。
- `title` / `body` は nullable。

### デザイン

- **色**: `#4CB3F8`（primary）、`#333`、`#4D4D4D`、`#B3B3B3`（normal）、`#F5F8FA`、`#C8E6FA`
- **フォント**: Noto Sans JP（24px / 16px / 12px / 10px）
- **ボタン**
  - 種類: primary（Edit / Save）、secondary（Done / New page）、normal（Cancel）、アイコンのみ（ゴミ箱）
  - 状態: hover / pressed / disabled
  - サイズ: 高さ 40px、最小幅 40px、ボタン間 10px
- **画面の状態**
  - `01_default`: 通常表示
  - `02_menu_edit`: サイドバー編集モード（ゴミ箱アイコン + New page + Done を表示）
  - `03_title_edit` / `04_text_edit`: タイトル／本文を個別に編集（Cancel + Save を表示）

### ディレクトリ構成（機能単位）

```
frontend/
  src/
    app/            # QueryClientProvider, Layout, 選択中ページの状態
    api/            # fetch クライアント, contentApi, 型
    features/
      sidebar/      # Sidebar, SidebarItem, 編集モード
      page/         # PageView, EditableTitle, EditableBody, hooks
    components/ui/  # Button(variant/icon), IconButton, TextField, TextArea, Dialog, Icon
    lib/            # contentSchema.ts（Zod のスキーマ。Phase 5 で作成ダイアログから移す）
    styles/         # index.css（Tailwind の読み込み + @theme でデザイントークン定義）
    assets/icons/   # Design/img をコピー
```

## 実装計画

### Phase 1: 環境構築

- [x] Vite + React + TypeScript で `frontend/` を作成
- [x] oxlint（テンプレート標準）/ Prettier を設定
- [x] Vitest + React Testing Library + user-event + jsdom + MSW を設定
- [x] Tailwind CSS v4 を導入し、`@theme` にデザイントークンを定義、Noto Sans JP を読み込む
- [x] `Design/img` のアイコンを `assets/icons/` へ配置
- [x] API のベース URL を環境変数（`VITE_API_BASE_URL`）にする
- [x] 🔍 レビュー

### Phase 2: API 層

- [x] `Content` 型の定義（nullable を考慮）
- [x] fetch クライアント（エラーハンドリング、204 / 中身が空の 200 レスポンスへの対応）
- [x] `contentApi`（fetchAll / fetchById / create / update / remove）
- [x] TanStack Query hooks（`useContents` / `useContent` / `useCreateContent` / `useUpdateContent` / `useDeleteContent`）
- [ ] 🔍 レビュー

### Phase 3: UI 部品

- [x] `Button`（variant: primary / secondary / normal、size: default / compact、icon + label、hover / pressed / disabled）
- [x] `IconButton`（ゴミ箱。ラベルは aria-label）
- [x] `Icon`（CSS の mask でアイコンを文字色に塗る。）
- [x] `TextField` / `TextArea`（エラー表示付き）
- [x] `Dialog`（`<dialog>` ベース。作成ダイアログで使う）
- [x] 🔍 レビュー

### Phase 4: レイアウトとサイドバーの表示

- [x] `QueryClientProvider` の設定
- [x] 全体レイアウト（サイドバー / メインエリアの枠 / フッター）
- [x] サイドバーにコンテンツ一覧を表示し、選択中の行を強調
- [x] 選択中のコンテンツ ID（`App` に直接書く。初期表示は先頭。）
- [x] メインエリアに選択中のコンテンツ（タイトル・本文）を表示（0 件・見つからないときの表示、デザイン仕様のスクロールバー）
- [x] 🔍 レビュー

### Phase 4.5: サイドバーの編集モード（作成・削除）

- [x] サイドバー編集モード（Edit ⇄ Done、ゴミ箱アイコンの表示）
- [x] バリデーション関数（タイトル 1〜50 文字、本文 10〜2000 文字。trim してから Zod 標準の `.min()` / `.max()` で数える。）
- [x] コンテンツの追加（New page → 作成ダイアログで入力・検証 → 作成 → そのコンテンツを選択）
- [x] コンテンツの削除（ゴミ箱を押したらすぐ削除。）
- [x] 🔍 レビュー

### Phase 5: メインエリアの編集

- [x] スキーマを `lib/contentSchema.ts` に移す（作成と更新の 2 か所で使うため）
- [x] `EditableField`（表示 ⇄ 編集、Cancel / Save、入力チェック、更新）
- [x] タイトルの編集・保存
- [x] 本文の編集・保存
- [x] 別のコンテンツを選んだら編集中の状態を破棄する（`ContentView` に `key`）
- [x] 🔍 レビュー

### Phase 6: 読み込み中とエラーの表示

- [x] 取得の再試行を 1 回にする
- [x] 作成・更新・削除の失敗を Sonner で一括通知（`MutationCache` の `onError`）
- [x] 「読み込み中…」「取得に失敗しました」を Suspense / Error Boundary で表示（一覧は画面全体、詳細はメインエリア）
- [x] 取得済みのデータがあれば、再取得に失敗しても表示を続ける
- [x] 🔍 レビュー

### Phase 7: テスト

- [x] 0. 準備（MSW の偽バックエンド、描画ヘルパー）
- [x] 1. 一覧の表示（要件 1）
- [x] 2. タイトルの編集・保存、Cancel（要件 4）
- [x] 3. 本文の編集・保存（要件 4）
- [x] 4. バリデーションの単体テスト（境界値、空白のみ）
- [x] 5. 作成（不正な入力では保存できない／保存すると追加・選択される）（要件 2）。
- [x] 6. 削除（要件 3）
- [x] `vite.config.ts` の `passWithNoTests` を外す
- [x] 🔍 レビュー
