import { Box, Card, CardContent, Avatar, Typography, IconButton, Stack } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import type { GitHubUser } from '../types/github'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { likeUser, unlikeUser } from '@store/slices/likedSlice'
import { useNavigate } from 'react-router-dom'

interface UserCardProps {
  user: GitHubUser
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const likedUsers = useSelector((state: RootState) => state.liked.users)
  const isLiked = likedUsers.some((u) => u.id === user.id)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLiked) {
      dispatch(unlikeUser(user.id))
    } else {
      dispatch(likeUser(user))
    }
  }

  const handleCardClick = () => {
    navigate(`/users/${user.login}`)
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 3,
        }}
      >
        <Avatar
          src={user.avatar_url}
          sx={{
            width: 120,
            height: 120,
          }}
        />
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 600 }}>
          {user.login}
        </Typography>
        <Stack direction="row" spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Followers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {(user.followers ?? 0).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Following
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {(user.following ?? 0).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={handleLike}
          sx={{
            color: isLiked ? 'error.main' : 'inherit',
            transition: 'all 0.2s ease',
          }}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  )
}
