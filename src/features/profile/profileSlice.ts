import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Post, Profile } from '../../helpers/types/types'
import { profileAPI } from './profileAPI'

export interface ProfileState {
  profile: Profile | null
  status: string
  posts: Array<Post>
}

const initialState: ProfileState = {
  profile: null,
  status: '',
  posts: [
    { id: 1, message: 'my first post', likesCount: 2 },
    { id: 2, message: 'Hi, how are you?', likesCount: 12 }
  ]
}

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (userId: number) => await profileAPI.getProfile(userId)
)

export const getStatus = createAsyncThunk(
  'profile/getStatus',
  async (userId: number) => await profileAPI.getStatus(userId)
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.profile = action.payload
        }
      )
      .addCase(getStatus.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = action.payload
      })
  }
})

export const selectProfile = (state: RootState) => state.profile.profile
export const selectStatus = (state: RootState) => state.profile.status

export default profileSlice.reducer
