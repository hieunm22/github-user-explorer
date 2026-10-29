import { Container, Box, Grid, Typography, CircularProgress, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { useEffect } from 'react'
import { searchUsers } from '@store/slices/searchSlice'
import { SearchBar } from '@components/SearchBar'
import { UserCard } from '@components/UserCard'
import { UserPagination } from '@components/UserPagination'

export const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { query, results, loading, error, totalCount } = useSelector((state: RootState) => state.search)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlQuery = params.get('q')
    const urlPage = params.get('page')

    if (urlQuery && urlQuery !== query) {
      dispatch(searchUsers({ query: urlQuery, page: parseInt(urlPage || '1') }))
    }
  }, [dispatch, query])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.set('q', query)
    }
    const newUrl = `/?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }, [query])

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && results.length === 0 && query && (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No users found for "{query}"
          </Typography>
        </Box>
      )}

      {!loading && !error && results.length === 0 && !query && (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Start typing to search for GitHub users
          </Typography>
        </Box>
      )}

      {!loading && results.length > 0 && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Found {totalCount.toLocaleString()} users
          </Typography>
          <Grid container spacing={3} sx={{ marginBottom: 4 }}>
            {results.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
          <UserPagination />
        </>
      )}
    </Container>
  )
}
