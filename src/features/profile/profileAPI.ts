import { Profile } from '../../helpers/types/types'
import { APIResponse, instance } from './../../api/api'

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<Profile>('profile/' + userId)
      .then((response) => response.data)
  },
  getStatus(userId: number) {
    return instance
      .get<string>('profile/status/' + userId)
      .then((response) => response.data)
  },
  updateStatus(status: string) {
    return instance
      .put<APIResponse>('profile/status/', { status })
      .then((response) => response.data)
  }
}
