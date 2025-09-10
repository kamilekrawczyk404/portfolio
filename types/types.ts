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

import {
  createTranslator,
  Messages,
  NamespaceKeys,
  NestedKeyOf,
} from "next-intl";

export type TFunction<
  NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never,
> = ReturnType<typeof createTranslator<Messages, NestedKey>>;
