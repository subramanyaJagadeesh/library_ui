export interface ErrorDetail {
  isError: boolean,
  message: string,
}

export interface Error{
  [key: string]: ErrorDetail
}