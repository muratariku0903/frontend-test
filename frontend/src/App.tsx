import logo from './assets/icons/logo.svg';

// Phase 1 の動作確認用。Phase 4 でレイアウトに置き換える。
export const App = () => (
  <main className="flex items-center gap-2 p-8">
    <img src={logo} alt="" className="size-8" />
    <h1 className="text-2xl font-bold">ServiceName</h1>
  </main>
);
