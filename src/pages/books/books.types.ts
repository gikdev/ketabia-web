export interface BookBase {
  name: string
  authorName: string
  isConfirmed: boolean
  isBought: boolean
  isRead: boolean
  hasBeenApplied: boolean
  rating: number
}

export interface BookWId extends BookBase {
  id: string
}
