export type GithubRepo = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: boolean;
  defaultBranch: string;
  url: string;
  languages: object[] | [] | null;
};
