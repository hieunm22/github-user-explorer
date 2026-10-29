import { Container, Box, Button, Stack } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const likedCount = useSelector((state: RootState) => state.liked.users.length)

  const isSearchPage = location.pathname === '/'
  const isLikedPage = location.pathname === '/liked'

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '1rem 0',
        boxShadow: 1,
        marginBottom: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
            GitHub Explorer
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant={isSearchPage ? 'contained' : 'outlined'}
              color="inherit"
              onClick={() => navigate('/')}
            >
              Search
            </Button>
            <Button
              variant={isLikedPage ? 'contained' : 'outlined'}
              color="inherit"
              onClick={() => navigate('/liked')}
            >
              Liked ({likedCount})
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
