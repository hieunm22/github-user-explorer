import axios from 'axios'
import type { GitHubUser, SearchUsersResponse, GitHubRepository } from '../types/github'

const API_BASE_URL = 'https://api.github.com'
const API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: API_TOKEN ? {
    Authorization: `token ${API_TOKEN}`,
  } : {},
})

export const githubService = {
  searchUsers: async (query: string, page: number = 1, per_page: number = 30): Promise<SearchUsersResponse> => {
    const response = await client.get<SearchUsersResponse>('/search/users', {
      params: {
        q: query,
        page,
        per_page,
        sort: 'followers',
        order: 'desc',
      },
    })
    return response.data
  },

  getUser: async (username: string): Promise<GitHubUser> => {
    const response = await client.get<GitHubUser>(`/users/${username}`)
    return response.data
  },

  getUserRepositories: async (username: string, page: number = 1, per_page: number = 30): Promise<GitHubRepository[]> => {
    const response = await client.get<GitHubRepository[]>(`/users/${username}/repos`, {
      params: {
        page,
        per_page,
        sort: 'stars',
        order: 'desc',
      },
    })
    return response.data
  },

  getUserFollowers: async (username: string, page: number = 1, per_page: number = 30): Promise<GitHubUser[]> => {
    const response = await client.get<GitHubUser[]>(`/users/${username}/followers`, {
      params: {
        page,
        per_page,
      },
    })
    return response.data
  },

  getUserFollowing: async (username: string, page: number = 1, per_page: number = 30): Promise<GitHubUser[]> => {
    const response = await client.get<GitHubUser[]>(`/users/${username}/following`, {
      params: {
        page,
        per_page,
      },
    })
    return response.data
  },
}
