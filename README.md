## Description

NCDC フロント課題のバックエンドリポジトリ
![](./Design/画面/20220615/03_title_edit.png)

## Installation & exec

```bash
# install
$ npm install
# migration
$ npm run migration:run
# start build
$ npm run build
# 実行
$ npm run start
```

## API

API の Document は、  
アプリを起動後、`http://localhost:3000/api` にて Swagger で確認できる。  
![](./doc/images/swagger.png)

## DB を初期状態に戻す

```bash
$ cp ./data/bk-dev.sqlite ./data/dev.sqlite
```

## 技術選定

### フレームワーク：React + Vite

- 今回は既存の REST API を呼ぶだけの SPA で、SEO や SSR は必要ない。
- API サーバーも別に存在するため、Next.js などの SSR 対応フレームワークを使う利点が小さく、Vite による SPA 構成が最もシンプルだと判断した。
- 目安の 8 時間で品質を確保するため、使い慣れていて設計の判断に迷いが少ない技術を選んだ。

### データ取得：TanStack Query

- サイドバーとメインエリアは同じデータを 2 か所に表示しており、作成・削除・タイトル編集のたびに両方を最新の状態にする必要があると考えた。
- TanStack Query を使うと、更新後にクエリキー単位で再取得を指示でき、ローディングやエラーの状態も宣言的に扱える。
- React Router のデータ APIも検討したが、キャッシュがないことと、更新後の再取得の範囲を細かく制御しにくいことから採用しなかった。

### スタイリング：Tailwind CSS

- 普段から使っており、8 時間という実装時間の中でデザインを素早く再現できると考えた。
- 色やフォントは `@theme` にトークンとして定義し、仕様の値との対応が分かりやすい。

### テスト：Vitest + React Testing Library + MSW

- **Vitest**：Vite の設定をそのまま使え、追加の設定がほとんど要らない。
- **React Testing Library + user-event**：ユーザーから見える要素（役割やラベル）で操作するため、実装の詳細に依存しないテストにできる。
- **MSW**：fetch クライアントから TanStack Query まで本物のコードを動かせる。これにより、更新後にサイドバーとメインエリアの両方が最新になることを確認できる。
- テストの対象は、課題で明示された制約であるバリデーション（境界値の単体テスト）と、要件の中心である編集・追加・削除の流れ（結合テスト）を優先した。E2E は実装時間を考えて見送った。
