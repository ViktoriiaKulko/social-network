import { User } from '../../helpers/types/types'
import { instance } from './../../api/api'

export interface GetUsersResponse {
  items: Array<User>
  totalCount: number
  error: string | null
}

export const usersAPI = {
  getUsers(
    currentPage: number,
    pageSize: number,
    term: string = '',
    friend: null | boolean = null
  ) {
    return instance
      .get<GetUsersResponse>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`)
      )
      .then((response) => response.data)
  }
}
