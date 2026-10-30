# Architecture & Design Decisions

## Project Structure Overview

```
src/
├── components/           # Reusable UI components
├── pages/               # Full-page components (routed)
├── services/            # External API integration
├── store/               # Redux state management
│   ├── index.ts         # Store configuration
│   └── slices/          # Redux slices (features)
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## State Management Architecture

### Redux Store Structure

```
{
  search: {
    query: string
    results: GitHubUser[]
    totalCount: number
    page: number
    perPage: number
    loading: boolean
    error: string | null
  },
  liked: {
    users: GitHubUser[]  // Persisted with Redux Persist
  },
  userDetail: {
    user: GitHubUser | null
    repositories: GitHubRepository[]
    followers: GitHubUser[]
    following: GitHubUser[]
    loading: boolean
    error: string | null
    activeTab: 'repositories' | 'followers' | 'following'
  }
}
```

### Slices

1. **searchSlice.ts**
   - Handles user search functionality
   - Manages pagination and results
   - Async thunk for API calls
   - Debounced through component level (300ms)

2. **likedSlice.ts**
   - Manages liked users list
   - Actions: `likeUser`, `unlikeUser`
   - Persisted to localStorage via Redux Persist

3. **userDetailSlice.ts**
   - Manages individual user profile data
   - Separate async thunks for each data type:
     - `fetchUserDetail`
     - `fetchUserRepositories`
     - `fetchUserFollowers`
     - `fetchUserFollowing`
   - Tab navigation state

## API Integration

### GitHub API Endpoints Used

```
GET /search/users?q={query}&page={page}&per_page={perPage}
GET /users/{username}
GET /users/{username}/repos
GET /users/{username}/followers
GET /users/{username}/following
```

### Error Handling

- Network errors caught and displayed to user
- API rate limit errors handled gracefully
- Missing data fields have fallbacks (null values)
- Each async thunk has its own error handling

## Routing Strategy

### React Router Setup

```
/                    → SearchPage (search & browse)
/liked               → LikedPage (saved users)
/users/:username     → UserDetailPage (profile details)
```

Features:

- URL parameters preserved for sharing
- Browser history navigation works
- Deep linking supported

## Styling Approach

### Material-UI + Emotion

- Component-level styling with sx prop
- Dark mode support via ThemeProvider
- Responsive breakpoints:
  - xs: 0px
  - sm: 600px
  - md: 960px
  - lg: 1280px
  - xl: 1920px

### Color Scheme

**Light Theme:**

- Primary: #0969da (GitHub Blue)
- Secondary: #6f42c1 (Purple)

**Dark Theme:**

- Primary: #58a6ff (Light Blue)
- Secondary: #79c0ff (Lighter Blue)

## Performance Optimizations

### Search Debouncing

```typescript
// 300ms debounce in SearchBar component
useEffect(() => {
	const timer = setTimeout(() => {
		dispatch(searchUsers({ query: inputValue, page: 1 }))
	}, 300)
	return () => clearTimeout(timer)
}, [inputValue])
```

### Pagination

- API results limited to 30 per page
- GitHub API max is 100, but 30 provides better UX
- Page count capped at 34 (GitHub limitation)

### Redux Selectors

- Selectors used throughout to avoid unnecessary re-renders
- Redux Persist only persists liked users (not search results)

## TypeScript Implementation

### Key Type Files

**src/types/github.ts**

```typescript
interface GitHubUser {
	id: number
	login: string
	avatar_url: string
	followers: number
	following: number
	// ... other fields
}
```

### Type Safety

- All Redux actions typed with PayloadAction
- Async thunks have full type support
- Component props properly typed
- No `any` types used

## Browser Storage

### Redux Persist Configuration

```typescript
const persistConfig = {
	key: "root",
	storage: localStorage,
	whitelist: ["liked"], // Only persist liked users
}
```

**Why persist only `liked`?**

- Search results are ephemeral (user types new query)
- Liked users are intentional and need persistence
- Reduces localStorage bloat

## Responsive Design Strategy

### Mobile-First Approach

```typescript
// Grid breakpoints
xs={12}      // Mobile: full width
sm={6}       // Small: half width
md={4}       // Medium: 3 columns
lg={3}       // Large: 4 columns
```

### Touch Optimization

- Icon buttons sized for touch (44px minimum)
- Spacing optimized for finger interaction
- No hover-dependent interactions

## Error Handling Strategy

### Three-Tier Approach

1. **Network Layer** (axios interceptor)
   - Catch connection errors
   - Handle timeouts

2. **Redux Thunk Level** (rejectionWithValue)
   - Catch API errors
   - Format error messages

3. **Component Level** (conditional rendering)
   - Display error UI
   - Show empty states
   - Loading skeletons

## Future Enhancement Opportunities

### Easy Wins

- [ ] Image lazy loading
- [ ] Search suggestions
- [ ] Recent searches
- [ ] Star animation on like

### Medium Complexity

- [ ] Advanced filters (location, language)
- [ ] Repository comparison
- [ ] User activity timeline
- [ ] Export liked users as JSON/CSV

### Advanced

- [ ] Server-side rendering (Next.js migration)
- [ ] Infinite scroll instead of pagination
- [ ] Progressive Web App capabilities
- [ ] Offline support with Service Workers

## Build & Deploy

### Vite Build Optimization

```bash
# Development
npm run dev          # Hot reload + TypeScript

# Production
npm run build        # Optimized output
npm run preview      # Preview production build
```

### Output Size

- HTML: 0.47 kB (gzip: 0.30 kB)
- CSS: 0.29 kB (gzip: 0.23 kB)
- JS: 502 kB minified (162 kB gzip)

### Deployment Targets

1. **Vercel** - Optimal for Vite
2. **Netlify** - Excellent DX
3. **GitHub Pages** - Free hosting
4. **AWS Amplify** - Scalable option

## Testing Strategy (Future)

```typescript
// Example test structure
describe("SearchPage", () => {
	it("should search users on input change")
	it("should paginate results")
	it("should display error messages")
	it("should show loading state")
})

describe("ReduxStore", () => {
	it("should like/unlike users")
	it("should persist liked users")
	it("should handle API errors")
})
```

## Accessibility Considerations

- Semantic HTML elements
- ARIA labels on icon buttons
- Color contrast meets WCAG AA
- Keyboard navigation supported
- Focus management in modals (future)

## Security Notes

- No sensitive data stored (except token if provided)
- No XSS vulnerabilities (React escapes by default)
- No CSRF concerns (read-only API)
- GitHub API token stored in environment variable
- Never commit secrets to git

---

## Decision Log

| Decision           | Rationale                                 | Alternatives        |
| ------------------ | ----------------------------------------- | ------------------- |
| Redux over Context | Persistence, DevTools, larger app         | Context API         |
| Material-UI        | Complete component library, accessibility | Bootstrap, Tailwind |
| Vite over CRA      | Fast refresh, modern bundler              | Create React App    |
| TypeScript         | Type safety, better DX                    | JavaScript          |
| Redux Persist      | Automatic storage serialization           | Manual localStorage |
| 300ms debounce     | Balances UX and API calls                 | No debounce, 500ms+ |
| 30 results/page    | Better UX than max 100                    | 100, 10, etc        |
