export interface GitHubUser {
	id: number
	login: string
	avatar_url: string
	followers: number
	following: number
	name: string | null
	email: string | null
	location: string | null
	bio: string | null
	blog: string
	twitter_username: string | null
	company: string | null
	created_at: string
	updated_at: string
	public_repos: number
}

export interface GitHubRepository {
	id: number
	name: string
	html_url: string
	description: string | null
	stars: number
	language: string | null
	forks_count: number
}

export interface SearchUsersResponse {
	total_count: number
	incomplete_results: boolean
	items: GitHubUser[]
}
