import { Container, Grid, CircularProgress, Box, Typography, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { useEffect } from 'react'
import { UserCard } from '@components/UserCard'

export const LikedPage: React.FC = () => {
  const likedUsers = useSelector((state: RootState) => state.liked.users)

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {likedUsers.length === 0 ? (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No liked users yet. Start searching and like some users!
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Your Liked Users ({likedUsers.length})
          </Typography>
          <Grid container spacing={3}>
            {likedUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  )
}
