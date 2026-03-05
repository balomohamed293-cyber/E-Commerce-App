export interface SubCategoryRes {
  results: number
  metadata: Metadata
  data: Data[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Data {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}
