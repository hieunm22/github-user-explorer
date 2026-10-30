import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { githubService } from "@services/github"
import type { GitHubUser, SearchUsersResponse } from "../../types/github"

interface SearchState {
	query: string
	results: GitHubUser[]
	totalCount: number
	page: number
	perPage: number
	loading: boolean
	error: string | null
}

const initialState: SearchState = {
	query: "",
	results: [],
	totalCount: 0,
	page: 1,
	perPage: 30,
	loading: false,
	error: null,
}

export const searchUsers = createAsyncThunk(
	"search/searchUsers",
	async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
		try {
			if (!query.trim()) {
				return { items: [], total_count: 0, incomplete_results: false }
			}
			return await githubService.searchUsers(query, page)
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to search users")
		}
	},
)

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload
			state.page = 1
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		clearSearch: (state) => {
			state.query = ""
			state.results = []
			state.totalCount = 0
			state.page = 1
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(searchUsers.fulfilled, (state, action: PayloadAction<SearchUsersResponse>) => {
				state.loading = false
				state.results = action.payload.items
				state.totalCount = action.payload.total_count
			})
			.addCase(searchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
				state.results = []
			})
	},
})

export const { setQuery, setPage, clearSearch } = searchSlice.actions
export default searchSlice.reducer
