import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { githubService } from "@services/github"
import type { GitHubRepository, GitHubUser } from "../../types/github"

interface UserDetailState {
	user: GitHubUser | null
	repositories: GitHubRepository[]
	followers: GitHubUser[]
	following: GitHubUser[]
	loading: boolean
	error: string | null
	activeTab: "repositories" | "followers" | "following"
}

const initialState: UserDetailState = {
	user: null,
	repositories: [],
	followers: [],
	following: [],
	loading: false,
	error: null,
	activeTab: "repositories",
}

export const fetchUserDetail = createAsyncThunk(
	"userDetail/fetchUserDetail",
	async (username: string, { rejectWithValue }) => {
		try {
			return await githubService.getUser(username)
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch user")
		}
	},
)

export const fetchUserRepositories = createAsyncThunk(
	"userDetail/fetchRepositories",
	async (username: string, { rejectWithValue }) => {
		try {
			return await githubService.getUserRepositories(username)
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch repositories")
		}
	},
)

export const fetchUserFollowers = createAsyncThunk(
	"userDetail/fetchFollowers",
	async (username: string, { rejectWithValue }) => {
		try {
			return await githubService.getUserFollowers(username)
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch followers")
		}
	},
)

export const fetchUserFollowing = createAsyncThunk(
	"userDetail/fetchFollowing",
	async (username: string, { rejectWithValue }) => {
		try {
			return await githubService.getUserFollowing(username)
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch following")
		}
	},
)

const userDetailSlice = createSlice({
	name: "userDetail",
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<"repositories" | "followers" | "following">) => {
			state.activeTab = action.payload
		},
		clearUserDetail: (state) => {
			state.user = null
			state.repositories = []
			state.followers = []
			state.following = []
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserDetail.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUserDetail.fulfilled, (state, action: PayloadAction<GitHubUser>) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(fetchUserDetail.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(
				fetchUserRepositories.fulfilled,
				(state, action: PayloadAction<GitHubRepository[]>) => {
					state.repositories = action.payload
				},
			)
			.addCase(fetchUserFollowers.fulfilled, (state, action: PayloadAction<GitHubUser[]>) => {
				state.followers = action.payload
			})
			.addCase(fetchUserFollowing.fulfilled, (state, action: PayloadAction<GitHubUser[]>) => {
				state.following = action.payload
			})
	},
})

export const { setActiveTab, clearUserDetail } = userDetailSlice.actions
export default userDetailSlice.reducer
