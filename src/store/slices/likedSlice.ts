import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { GitHubUser } from '../../types/github'

interface LikedState {
  users: GitHubUser[]
}

const initialState: LikedState = {
  users: [],
}

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likeUser: (state, action: PayloadAction<GitHubUser>) => {
      const exists = state.users.some((u: GitHubUser) => u.id === action.payload.id)
      if (!exists) {
        state.users.push(action.payload)
      }
    },
    unlikeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u: GitHubUser) => u.id !== action.payload)
    },
  },
})

export const { likeUser, unlikeUser } = likedSlice.actions
export default likedSlice.reducer
