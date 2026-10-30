import { Search as SearchIcon } from "@mui/icons-material"
import { CircularProgress, InputAdornment, TextField } from "@mui/material"
import { AppDispatch, RootState } from "@/store/index"
import { searchUsers, setQuery } from "@/store/slices/searchSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const SearchBar: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const query = useSelector((state: RootState) => state.search.query)
	const loading = useSelector((state: RootState) => state.search.loading)
	const [inputValue, setInputValue] = useState(query)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (inputValue.trim()) {
				dispatch(setQuery(inputValue))
				dispatch(searchUsers({ query: inputValue, page: 1 }))
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [inputValue, dispatch])

	return (
		<TextField
			fullWidth
			placeholder="Search GitHub users..."
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{loading ? <CircularProgress size={20} /> : <SearchIcon />}
					</InputAdornment>
				),
			}}
			variant="outlined"
			sx={{
				maxWidth: 500,
			}}
		/>
	)
}
