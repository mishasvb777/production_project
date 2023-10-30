import { EntityState } from "@reduxjs/toolkit";
import { Comment } from "entites/Comment";

export interface ArticleDetailsCommentsSchema extends EntityState<Comment>{
  isLoading?: boolean;
  error?: string;
  ids: string[];
}