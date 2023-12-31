import { User } from "entites/User";

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export enum ArticleBlockType {
  CODE = "CODE", 
  TEXT = "TEXT",
  IMAGE = "IMAGE"
}

export interface ArticleImageBlock extends ArticleBlockBase{
  type: ArticleBlockType.IMAGE
  src: string,
  title: string
}

export interface ArticleTextBlock extends ArticleBlockBase{
  type: ArticleBlockType.TEXT
  title?: string,
  paragraphs: string[]
}

export interface ArticleCodeBlock extends ArticleBlockBase{
  type: ArticleBlockType.CODE
  code: string;
}

export enum ArticleType {
  IT ="IT",
  SCIENCE = "SCIENCE",
  ECONOMICS = "ECONOMICS"
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticleView {
  PLAYD = 'PLAYD',
  LIST = 'LIST'
}

export interface Article {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[]
  user: User
}