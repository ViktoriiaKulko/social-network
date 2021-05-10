import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ResultCodes } from '../../api/api'
import { AppThunk, RootState } from '../../app/store'
import { User } from '../../helpers/types/types'
import { usersAPI } from './usersAPI'

export interface UsersState {
  users: Array<User>
  pageSize: number
  totalUsersNumber: number
  currentPage: number
  isFetching: boolean
  filter: Filters
}

interface Filters {
  term: string
  friend: boolean | null
}

const initialState: UsersState = {
  users: [],
  pageSize: 12,
  totalUsersNumber: 0,
  currentPage: 1,
  isFetching: false,
  filter: {
    term: '',
    friend: null
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleIsFetching: (state) => {
      state.isFetching = !state.isFetching
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filter = action.payload
    },
    setUsers: (state, action: PayloadAction<Array<User>>) => {
      state.users = action.payload
    },
    setTotalUsersCount: (state, action: PayloadAction<number>) => {
      state.totalUsersNumber = action.payload
    },
    toggleFollowingProgress: (state, action: PayloadAction<number>) => {
      const selectedUser = state.users.find((user) => user.id == action.payload)
      if (selectedUser) {
        selectedUser.isFollowingProgress = !selectedUser.isFollowingProgress
      }
    },
    toggleFollowing: (state, action: PayloadAction<number>) => {
      const selectedUser = state.users.find((user) => user.id == action.payload)
      if (selectedUser) {
        selectedUser.followed = !selectedUser.followed
      }
    }
  }
})

export const {
  toggleIsFetching,
  setCurrentPage,
  setFilters,
  setUsers,
  setTotalUsersCount,
  toggleFollowingProgress,
  toggleFollowing
} = usersSlice.actions

export const selectCurrentPage = (state: RootState) => state.users.currentPage
export const selectPageSize = (state: RootState) => state.users.pageSize
export const selectFilter = (state: RootState) => state.users.filter
export const selectUsers = (state: RootState) => state.users.users
export const selectPagesNumber = (state: RootState) =>
  Math.ceil(state.users.totalUsersNumber / state.users.pageSize)

export const requestUsers = (
  page: number,
  pageSize: number,
  filters: Filters
): AppThunk => async (dispatch) => {
  dispatch(toggleIsFetching())
  dispatch(setCurrentPage(page))
  dispatch(setFilters(filters))

  const response = await usersAPI.getUsers(
    page,
    pageSize,
    filters.term,
    filters.friend
  )

  dispatch(toggleIsFetching())
  dispatch(setUsers(response.items))
  dispatch(setTotalUsersCount(response.totalCount))
}

export const toggleUserFollowing = (userId: number): AppThunk => async (
  dispatch,
  getState
) => {
  const users = getState().users.users
  const selectedUser = users.find((user) => user.id == userId)

  dispatch(toggleFollowingProgress(userId))

  const response = selectedUser?.followed
    ? await usersAPI.unfollow(userId)
    : await usersAPI.follow(userId)

  if (response.resultCode === ResultCodes.Success) {
    dispatch(toggleFollowing(userId))
  }

  dispatch(toggleFollowingProgress(userId))
}

export default usersSlice.reducer
