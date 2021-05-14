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

export interface Profile {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: Contacts
  photos: Photos
  aboutMe: string // ?
}

export interface Contacts {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type Post = {
  id: number
  message: string
  likesCount: number
}
