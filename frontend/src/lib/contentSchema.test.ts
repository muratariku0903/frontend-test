import { describe, expect, it } from 'vitest';
import { contentSchema } from './contentSchema';

describe('contentSchema', () => {
  // 片方の項目を確かめるときに、もう片方へ入れる正しい値
  const validTitle = 'あ';
  const validBody = 'あ'.repeat(10);

  it.each([
    { case: '0 文字', title: '', valid: false },
    { case: '1 文字', title: 'あ', valid: true },
    { case: '50 文字', title: 'あ'.repeat(50), valid: true },
    { case: '51 文字', title: 'あ'.repeat(51), valid: false },
    { case: '空白だけ', title: '   ', valid: false },
  ])('タイトルが $case なら valid=$valid', ({ title, valid }) => {
    expect(contentSchema.safeParse({ title, body: validBody }).success).toBe(
      valid,
    );
  });

  it.each([
    { case: '9 文字', body: 'あ'.repeat(9), valid: false },
    { case: '10 文字', body: 'あ'.repeat(10), valid: true },
    { case: '2000 文字', body: 'あ'.repeat(2000), valid: true },
    { case: '2001 文字', body: 'あ'.repeat(2001), valid: false },
  ])('本文が $case なら valid=$valid', ({ body, valid }) => {
    expect(contentSchema.safeParse({ title: validTitle, body }).success).toBe(
      valid,
    );
  });

  it('前後の空白を除いてから数え、除いた値を返す', () => {
    const result = contentSchema.parse({
      title: '  坊ちゃん  ',
      body: `  ${validBody}  `,
    });

    expect(result).toEqual({ title: '坊ちゃん', body: validBody });
  });
});
