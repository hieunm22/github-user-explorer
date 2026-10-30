# GitHub User Explorer

A React-based GitHub user search and exploration application built with TypeScript, Redux, and Material-UI.

## Features

### Core Features (Basic)

- ✅ Search GitHub users by username with real-time suggestions
- ✅ View user cards with avatar, follower/following counts
- ✅ Like/unlike users for future reference
- ✅ Persistent liked users list (survives browser refresh)
- ✅ Detailed user profiles with repositories, followers, and following lists
- ✅ Pagination support for search results

### Bonus Features

- ✅ Responsive design (desktop and mobile)
- ✅ Shareable URLs - browser history preserved
- ✅ Search as you type functionality
- ✅ Dark mode support
- ✅ Loading states, error handling, and empty states
- ✅ TypeScript for type safety

## Tech Stack

### Frontend Framework & UI

- **React** (18.2.0) - UI library
- **TypeScript** (5.3.3) - Type safety
- **Material-UI** (5.14.20) - Component library
- **Emotion** - CSS-in-JS styling

### State Management

- **Redux** (4.2.1) - State management
- **Redux Toolkit** (1.9.7) - Redux utilities
- **Redux Persist** (6.0.0) - State persistence

### HTTP Client

- **Axios** (1.6.8) - API requests

### Build & Development

- **Vite** (5.0.8) - Build tool and dev server
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.tsx       # Navigation header
│   ├── SearchBar.tsx    # Search input with debounce
│   ├── UserCard.tsx     # User card component
│   └── UserPagination.tsx # Pagination component
├── pages/               # Page components
│   ├── SearchPage.tsx   # Main search page
│   ├── LikedPage.tsx    # Liked users page
│   └── UserDetailPage.tsx # Individual user details
├── services/            # API services
│   └── github.ts        # GitHub API client
├── store/               # Redux store
│   ├── index.ts         # Store configuration
│   └── slices/          # Redux slices
│       ├── searchSlice.ts
│       ├── likedSlice.ts
│       └── userDetailSlice.ts
├── types/               # TypeScript type definitions
│   └── github.ts
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd github-user-explorer
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file (optional, for higher API rate limits):

```env
VITE_GITHUB_API_TOKEN=your_github_personal_access_token
```

## Development

### Start development server:

```bash
npm run dev
# or
pnpm dev
```

The application will open at `http://localhost:5173`

### Build for production:

```bash
npm run build
# or
pnpm build
```

### Preview production build:

```bash
npm run preview
# or
pnpm preview
```

### Type checking:

```bash
npm run type-check
# or
pnpm type-check
```

### Linting:

```bash
npm run lint
# or
pnpm lint
```

## Usage

### Search Users

1. Navigate to the Search page
2. Type a GitHub username in the search bar
3. Results appear as you type (with debouncing)
4. Browse through paginated results

### Like Users

- Click the heart icon on any user card to like/unlike
- Liked users are permanently saved in your browser

### View Liked Users

- Click the "Liked" tab in the header to see all your liked users
- This list persists across browser sessions

### View User Details

- Click on any user card to view detailed profile information:
  - User bio and contact information
  - Public repositories with details
  - List of followers
  - List of following users

### Toggle Dark Mode

- Click the theme toggle button (sun/moon icon) in the top right corner

## API Information

This application uses the [GitHub REST API](https://docs.github.com/en/rest) to fetch:

- User search results
- User profiles
- User repositories
- User followers and following lists

### Rate Limits

- Without authentication: 60 requests/hour
- With authentication token: 5,000 requests/hour

To increase rate limits, create a GitHub Personal Access Token and add it to `.env.local`:

```env
VITE_GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx
```

## Features in Detail

### Search Page

- Real-time search with 300ms debounce
- Results sorted by followers (descending)
- Pagination with max 30 results per page
- URL parameters preserved for sharing

### Liked Page

- View all saved users
- Like/unlike users from this page
- Persistent storage using Redux Persist

### User Detail Page

- Comprehensive user information
- Three tabs: Repositories, Followers, Following
- Clickable links to GitHub profiles
- Like/unlike functionality

### Responsive Design

- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Touch-friendly controls
- Optimized layouts for all screen sizes

### Dark Mode

- System theme detection (optional future feature)
- Persistent theme preference (optional future feature)
- Two complete theme configurations

## Error Handling

The application handles:

- Network errors with user-friendly messages
- Invalid usernames
- API rate limiting
- Missing or incomplete data
- Empty states for all pages

## Performance Optimizations

- Debounced search input (300ms)
- Lazy loading of images
- Code splitting via Vite
- Redux selectors for efficient re-renders
- Memoized components where beneficial

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Advanced search filters
- [ ] User comparison tool
- [ ] Repository starring/unstarring
- [ ] Following/unfollowing users
- [ ] User activity timeline
- [ ] Organizations and teams viewing
- [ ] Search history
- [ ] Custom themes/color schemes

## License

MIT

## Author

Created as part of the Oddle Frontend Challenge

---

For more information, visit the [GitHub API documentation](https://docs.github.com/en/rest).
