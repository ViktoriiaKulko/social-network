export type Photos = {
  small: string | null
  large: string | null
}

export interface User {
  id: number
  name: string
  status: string
  photos: Photos
  followed: boolean
  isFollowingProgress: boolean
}

export interface Filter {
  term: string
  friend: boolean | null
}
