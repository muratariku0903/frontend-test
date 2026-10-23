export type Content = {
  id: number;
  title: string | null;
  body: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateContentInput = {
  title: string;
  body: string;
};

export type UpdateContentInput = {
  title?: string;
  body?: string;
};
