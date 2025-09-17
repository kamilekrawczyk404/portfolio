import { View } from "@/views/Projects";

export type Technologies = {
  title: string;
  values: string[];
};

export type ProjectLanguage = { [k in string]: number };

export type ProjectDescription = {
  githubRepoName: string;
  keyFeaturesTitles: string[];
  technologies: Technologies[];
  link?: string;
};

export type FormattedProject = ProjectDescription & {
  thumbnail: string;
  views: View[];
  repository: GithubRepo;
};

export type GithubRepo = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: boolean;
  defaultBranch: string;
  url: string;
  languages: ProjectLanguage;
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
