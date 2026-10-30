import { Box, Pagination } from "@mui/material"
import { AppDispatch, RootState } from "@/store/index"
import { searchUsers, setPage } from "@/store/slices/searchSlice"
import { useDispatch, useSelector } from "react-redux"

export const UserPagination: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { query, page, perPage, totalCount } = useSelector((state: RootState) => state.search)

	const pageCount = Math.ceil(totalCount / perPage)

	const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
		dispatch(setPage(newPage))
		dispatch(searchUsers({ query, page: newPage }))
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	if (pageCount <= 1) {
		return null
	}

	return (
		<Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
			<Pagination
				count={Math.min(pageCount, 34)}
				page={page}
				onChange={handlePageChange}
				color="primary"
				size="large"
			/>
		</Box>
	)
}
