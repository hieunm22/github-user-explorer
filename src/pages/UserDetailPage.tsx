import {
  Container,
  Box,
  Typography,
  Avatar,
  Stack,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Link,
  CircularProgress,
  Alert,
  Button,
  IconButton,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@store/index'
import { useEffect, useState } from 'react'
import {
  fetchUserDetail,
  fetchUserRepositories,
  fetchUserFollowers,
  fetchUserFollowing,
  setActiveTab,
} from '@store/slices/userDetailSlice'
import { likeUser, unlikeUser } from '@store/slices/likedSlice'
import { Favorite, FavoriteBorder, ArrowBack } from '@mui/icons-material'
import { UserCard } from '@components/UserCard'

export const UserDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, repositories, followers, following, loading, error, activeTab } = useSelector(
    (state: RootState) => state.userDetail
  )
  const likedUsers = useSelector((state: RootState) => state.liked.users)
  const isLiked = user ? likedUsers.some((u) => u.id === user.id) : false

  useEffect(() => {
    if (username) {
      dispatch(fetchUserDetail(username))
      dispatch(fetchUserRepositories(username))
      dispatch(fetchUserFollowers(username))
      dispatch(fetchUserFollowing(username))
    }
  }, [username, dispatch])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    dispatch(setActiveTab(newValue as 'repositories' | 'followers' | 'following'))
  }

  const handleLike = () => {
    if (user) {
      if (isLiked) {
        dispatch(unlikeUser(user.id))
      } else {
        dispatch(likeUser(user))
      }
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Alert severity="warning">User not found</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ marginBottom: 3 }}>
        Back to Search
      </Button>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm="auto">
              <Avatar src={user.avatar_url} sx={{ width: 150, height: 150 }} />
            </Grid>
            <Grid item xs={12} sm>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    {user.name || user.login}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    @{user.login}
                  </Typography>
                </Box>

                {user.bio && (
                  <Typography variant="body1">{user.bio}</Typography>
                )}

                <Stack direction="row" spacing={2}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Followers
                    </Typography>
                    <Typography variant="h6">{(user.followers ?? 0).toLocaleString()}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Following
                    </Typography>
                    <Typography variant="h6">{(user.following ?? 0).toLocaleString()}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Public Repos
                    </Typography>
                    <Typography variant="h6">{user.public_repos ?? 0}</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {user.location && (
                    <Typography variant="body2">
                      <strong>Location:</strong> {user.location}
                    </Typography>
                  )}
                  {user.company && (
                    <Typography variant="body2">
                      <strong>Company:</strong> {user.company}
                    </Typography>
                  )}
                  {user.blog && (
                    <Typography variant="body2">
                      <strong>Blog:</strong>{' '}
                      <Link href={user.blog} target="_blank" rel="noopener">
                        {user.blog}
                      </Link>
                    </Typography>
                  )}
                </Stack>

                <IconButton
                  onClick={handleLike}
                  sx={{
                    color: isLiked ? 'error.main' : 'inherit',
                    width: 'fit-content',
                  }}
                >
                  {isLiked ? <Favorite /> : <FavoriteBorder />}
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    {isLiked ? 'Liked' : 'Like'}
                  </Typography>
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Repositories" value="repositories" />
          <Tab label={`Followers (${followers.length})`} value="followers" />
          <Tab label={`Following (${following.length})`} value="following" />
        </Tabs>
      </Box>

      {activeTab === 'repositories' && (
        <Grid container spacing={2}>
          {repositories.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="textSecondary">No repositories found</Typography>
            </Grid>
          ) : (
            repositories.map((repo) => (
              <Grid item xs={12} key={repo.id}>
                <Card>
                  <CardContent>
                    <Link href={repo.html_url} target="_blank" rel="noopener" variant="h6" sx={{ display: 'block', marginBottom: 1 }}>
                      {repo.name}
                    </Link>
                    {repo.description && (
                      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                        {repo.description}
                      </Typography>
                    )}
                    <Stack direction="row" spacing={2}>
                      {repo.language && (
                        <Typography variant="caption">
                          <strong>Language:</strong> {repo.language}
                        </Typography>
                      )}
                      <Typography variant="caption">
                        <strong>Stars:</strong> {repo.stars?.toLocaleString() || 0}
                      </Typography>
                      <Typography variant="caption">
                        <strong>Forks:</strong> {repo.forks_count?.toLocaleString() || 0}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {activeTab === 'followers' && (
        <Grid container spacing={3}>
          {followers.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="textSecondary">No followers</Typography>
            </Grid>
          ) : (
            followers.map((follower) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={follower.id}>
                <UserCard user={follower} />
              </Grid>
            ))
          )}
        </Grid>
      )}

      {activeTab === 'following' && (
        <Grid container spacing={3}>
          {following.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="textSecondary">Not following anyone</Typography>
            </Grid>
          ) : (
            following.map((followedUser) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={followedUser.id}>
                <UserCard user={followedUser} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  )
}
