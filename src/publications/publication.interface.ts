export interface Publication {
  id: number;
  title: string;
  author: string;
  year?: number;
  createdBy: string; // userId автора публикации
}
