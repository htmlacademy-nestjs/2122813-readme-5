export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_POST_SEARCH_COUNT_LIMIT = 20;
export const DEFAULT_SORT_BY = 'createdAt';

export enum PostMessage {
  Search = 'Search result by title',
  Add = 'Post added',
  Remove = 'Post removed',
  Update = 'Post updated',
  ShowAll = 'All posts',
  ShowUnpublished = 'All unpublished posts',
  Show = 'Post by id',
  SendNews = 'News'
}

export const RegExp = {
  Video:/(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/,
  Tag:/^[A-Za-zА-Яа-я]([A-Za-zА-Яа-я0-9_.])+$/g,
}

export enum TagParam {
  MinLength = 3,
  MaxLength = 10,
  MaxCount = 8
}

export enum PostError {
  TagSpaces = 'Tags should not contain spaces',
  TagStart = 'Tags should start with letter'
}

export enum TitleLength {
  Min = 20,
  Max = 50
}

export enum AnnounceLength {
  Min = 50,
  Max = 255
}

export enum DescriptionLength {
  Min = 20,
  Max = 300
}

export enum DescriptionTextPostLength {
  Min = 100,
  Max = 1024
}

export enum AuthorLength {
  Min = 3,
  Max = 50
}
