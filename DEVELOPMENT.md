# Development & Testing Guide

## Local Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/github-user-explorer.git
cd github-user-explorer

# Install dependencies
npm install

# Optional: Set up environment variables for higher API rate limits
echo "VITE_GITHUB_API_TOKEN=your_github_token" > .env.local
```

### GitHub Token Setup (Optional but Recommended)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` (minimal required)
4. Copy the token
5. Add to `.env.local`:
   ```
   VITE_GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx
   ```

**Why use a token?**
- Rate limit: 5,000 requests/hour (vs 60 without)
- Better for development
- No login required

## Development Server

### Start Development

```bash
npm run dev
```

The application will:
- Open at http://localhost:5173
- Enable hot module replacement
- Show TypeScript errors in terminal
- Auto-reload on file changes

### Key Development Features

- **Hot Reload** - Changes reflect instantly
- **Type Checking** - Errors shown in terminal
- **Redux DevTools** - Install browser extension for debugging state
- **Network Tab** - Monitor GitHub API calls

## Testing Workflow

### Manual Testing Checklist

#### Search Functionality
```
[ ] Search input appears
[ ] Typing triggers API calls (with debounce)
[ ] Results display within 2 seconds
[ ] Pagination works (if results > 30)
[ ] Empty state shows when no results
[ ] Error message shows on API failure
```

#### User Cards
```
[ ] Avatar displays correctly
[ ] Username shows
[ ] Follower/following counts visible
[ ] Like button works
[ ] Like button changes style when liked
[ ] Click card navigates to user detail page
```

#### Liked Page
```
[ ] Liked users display as cards
[ ] Like count updates in header
[ ] Can unlike from this page
[ ] Empty state shows when no liked users
[ ] Data persists after refresh (F5)
[ ] Data persists after browser close/reopen
```

#### User Detail Page
```
[ ] Page loads user information
[ ] Avatar, name, bio display
[ ] Follower/following/repo counts show
[ ] Contact info displays (if available)
[ ] Can like/unlike user
[ ] Three tabs available (repos, followers, following)
[ ] Each tab loads appropriate data
[ ] Back button returns to search
[ ] URL is shareable (copy & paste works)
```

#### Responsive Design
```
[ ] Mobile (375px):
    - Single column layout
    - Touch targets >= 44px
    - No horizontal scroll

[ ] Tablet (768px):
    - Two columns
    - Readable text size
    - Proper spacing

[ ] Desktop (1024px+):
    - Multi-column grid
    - Optimal spacing
    - All features accessible
```

#### Dark Mode
```
[ ] Toggle button present (sun/moon icon)
[ ] Light theme loads by default
[ ] Dark theme readable (contrast OK)
[ ] Both themes persistent (save preference - future)
[ ] All text visible in both themes
```

#### Performance
```
[ ] Page loads within 3 seconds
[ ] Animations smooth (60fps)
[ ] No console errors
[ ] No memory leaks (DevTools)
[ ] Debounce prevents rapid API calls
```

### Automated Testing (Future)

Create `src/__tests__/` directory with tests:

```typescript
// Example: src/__tests__/searchSlice.test.ts
import { configureStore } from '@reduxjs/toolkit'
import searchReducer, { setQuery, searchUsers } from '@store/slices/searchSlice'

describe('searchSlice', () => {
  it('should set query', () => {
    const store = configureStore({ reducer: { search: searchReducer } })
    store.dispatch(setQuery('react'))
    expect(store.getState().search.query).toBe('react')
  })
})
```

Run tests (when implemented):
```bash
npm run test
```

## Type Checking

### Type Check Your Changes

```bash
# Check all files
npm run type-check

# Watch mode (auto-check on save)
# Add this to package.json scripts if needed:
# "type-check:watch": "tsc --noEmit --watch"
```

### Type Errors to Watch For

```typescript
// ❌ Don't do this
const user: any = response.data

// ✅ Do this
const user: GitHubUser = response.data

// ❌ Never use implicit any
const handleClick = (e) => {}  // e is any

// ✅ Always type your params
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
```

## Code Quality

### ESLint Configuration

```bash
# Run linting
npm run lint

# Fix common issues automatically
npm run lint -- --fix
```

### Best Practices

1. **Component Structure**
   ```typescript
   // Imports first
   import React from 'react'
   import { useSelector, useDispatch } from 'react-redux'
   
   // Props type
   interface ComponentProps {
     title: string
   }
   
   // Component
   export const Component: React.FC<ComponentProps> = ({ title }) => {
     return <div>{title}</div>
   }
   ```

2. **Redux Actions**
   ```typescript
   // Name actions clearly
   export const fetchUserDetail = createAsyncThunk(
     'userDetail/fetchUserDetail',  // 'slice/action' format
     async (username: string) => {
       // async work
     }
   )
   ```

3. **Async Operations**
   ```typescript
   // Always handle loading/error states
   if (loading) return <Spinner />
   if (error) return <Alert severity="error">{error}</Alert>
   return <Content data={data} />
   ```

## Debugging

### Redux DevTools

1. Install Redux DevTools browser extension
2. Development features:
   - Time travel debugging
   - Action replay
   - State snapshots
   - Action history

### Network Debugging

```javascript
// Monitor API calls in browser DevTools
// Network tab shows all GitHub API requests
// Check request/response in DevTools

// Mock API responses for testing:
// 1. Open DevTools > Network
// 2. Right-click request > Copy as fetch
// 3. Use in local test
```

### Console Logs

```typescript
// Good - informative
console.log('[SearchPage] Query:', query, 'Results:', results.length)

// Bad - vague
console.log('data')
console.log('loaded')
```

## Build Verification

### Before Committing

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Preview build
npm run preview
```

### All Checks Passing Example

```bash
$ npm run type-check
# (no output = success)

$ npm run build
✓ built in 4.71s

$ npm run preview
# Preview ready at http://localhost:5173
```

## Common Issues & Solutions

### Issue: API Rate Limited

**Symptoms:** "API rate limit exceeded" errors

**Solutions:**
1. Add GitHub token to `.env.local`
2. Wait an hour for limit reset
3. Use different rate-limited endpoint (if available)

### Issue: Dark Mode Not Working

**Symptoms:** Theme toggle present but theme doesn't change

**Check:**
```bash
# Verify Material-UI theme provider in App.tsx
# Ensure isDarkMode state is being toggled
# Check browser DevTools for CSS changes
```

### Issue: Liked Users Not Persisting

**Symptoms:** Liked users lost after refresh

**Check:**
```bash
# Verify Redux Persist configuration
# Check localStorage in DevTools
# Verify PersistGate wrapper in App.tsx
# Check browser's storage settings (incognito mode?)
```

### Issue: Search Not Debouncing

**Symptoms:** Too many API calls, rate limit issues

**Check:**
```typescript
// Verify SearchBar.tsx has setTimeout
// Check useEffect cleanup function exists
// Confirm 300ms delay is appropriate
```

### Issue: Type Errors After Changes

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Update TypeScript
npm install --save-dev typescript@latest

# Check tsconfig.json strictness
```

## Performance Profiling

### React Performance Profiler

```javascript
// In DevTools > Profiler tab
// Record interactions
// Analyze render times
// Identify unnecessary re-renders
```

### Network Performance

```bash
# Test with DevTools throttling
# DevTools > Network > Throttling > Slow 3G
# Verify acceptable load times
```

## Deployment Testing

### Production Build Locally

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open http://localhost:5173 in browser
# Test all features
```

### Deployment Checklist

- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run preview` loads correctly
- [ ] All features work in preview
- [ ] No console errors
- [ ] No broken links
- [ ] API calls work (with real GitHub API)
- [ ] Environment variables configured correctly

## Environment Variables

### Development (.env.local)

```
# Optional: GitHub Personal Access Token
VITE_GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx
```

### Production

```
# Same environment variable if needed
VITE_GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxx
```

**Note:** Without token, only 60 requests/hour

## Useful npm Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Quality
npm run type-check       # TypeScript check
npm run lint             # ESLint check
npm run lint -- --fix    # Fix lint issues

# Install
npm install              # Install dependencies
```

## Git Workflow for Development

```bash
# Create feature branch
git checkout -b feature/user-search

# Make changes and commit
git add src/
git commit -m "Add search functionality"

# Push to GitHub
git push origin feature/user-search

# Create Pull Request on GitHub
# Request review, iterate if needed

# Merge when approved
git checkout main
git pull origin main
git merge feature/user-search
git push origin main
```

## Next Steps

After setup:

1. Start development server: `npm run dev`
2. Open http://localhost:5173
3. Test search functionality
4. Try liking some users
5. Check browser's localStorage for persistence
6. Toggle dark mode
7. Test responsive design
8. Read through the code
9. Make improvements
10. Commit changes

Happy developing! 🚀
