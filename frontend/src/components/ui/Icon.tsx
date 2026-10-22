type Props = {
  /** SVG の URL */
  src: string;
};

/**
 * SVG を形としてだけ使い、色は文字色（currentColor）で塗る。
 * 支給アイコンの色に関係なく、ボタンの種類や状態に合わせた色にできる。
 */
export const Icon = ({ src }: Props) => (
  <span
    aria-hidden
    className="size-6 shrink-0 bg-current"
    style={{
      maskImage: `url("${src}")`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
    }}
  />
);
