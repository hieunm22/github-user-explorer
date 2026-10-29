# Submission Preparation Guide

This document provides detailed instructions for submitting this GitHub User Explorer project as your Oddle Frontend Challenge submission.

## Pre-Submission Checklist

- [ ] All features implemented (Basic + Bonus)
- [ ] TypeScript type checking passes (`npm run type-check`)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Application runs locally (`npm run dev`)
- [ ] No console errors or warnings
- [ ] Responsive design tested on mobile and desktop
- [ ] Dark mode tested and functional
- [ ] Search functionality works with debounce
- [ ] URL parameters preserved for sharing
- [ ] Liked users persist after page refresh
- [ ] All three pages accessible and functional

## Submission Steps

### 1. Create a Private Repository

```bash
# On GitHub, create a new private repository
# Name: github-user-explorer (or similar)
```

### 2. Set Up Initial Commit

The repository already has an initial setup commit. Push it to your private repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/github-user-explorer.git
git branch -M main
git push -u origin main
```

### 3. Create Submission Branch

```bash
# Create submission branch from the initial commit
git checkout --orphan submission main
git reset --soft main
git commit -m "Initial commit"
git push -u origin submission
```

### 4. Continue Development

Make your working branch from submission:

```bash
git checkout -b feature/implementation submission
# Continue making commits as you develop
```

### 5. Prepare for Review

When ready for review:

```bash
# Create a PR with [READY4REVIEW] prefix
# The PR should:
# - Be from your working branch
# - Target the 'submission' branch
# - Include all required information (see Step 8)
```

### 6. Invite Collaborators

1. Go to your repository Settings → Collaborators
2. Invite `oddle-hire-js` as a collaborator and reviewer

### 7. Deploy the Application

Deploy to a public URL. Some options:

- **Vercel** (recommended for Vite)
  ```bash
  npm install -g vercel
  vercel
  ```
  
- **Netlify**
  ```bash
  npm install -g netlify-cli
  netlify deploy --prod --dir=dist
  ```
  
- **GitHub Pages**
  - Build: `npm run build`
  - Deploy dist/ to gh-pages branch
  
- **AWS Amplify**, **Railway**, or other hosting

### 8. Create Pull Request

When creating the PR, include the following description:

```markdown
# GitHub User Explorer - Oddle Frontend Challenge

## Submission Information

**Full Name:** [Your Name]
**Email Address:** [Your Email]
**How did you know about this job:** [Your Answer]

## Challenge Completion

### Basic Requirements ✓
- [x] Search users by username with pagination
- [x] Display user cards with avatar, followers, following counts
- [x] Like/unlike functionality
- [x] Persistent liked users list
- [x] Detailed user profiles
  - [x] Repositories tab
  - [x] Followers tab
  - [x] Following tab

### Bonus Features Implemented ✓
- [x] Responsive design (mobile + desktop)
- [x] Shareable URLs with browser history
- [x] Search as you type
- [x] Dark mode support
- [x] Loading, error, and empty states
- [x] Full TypeScript implementation

## Tech Stack Used

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Redux Persist** for persistence
- **Material-UI** for components
- **Vite** for build tooling
- **Axios** for API requests
- **React Router** for navigation

## Live Demo

**URL:** [Your deployment URL]

## Feedback & Notes

[Add any additional notes or feedback about the assessment]

## How to Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.
```

## Important Notes

- **API Rate Limiting:** Without a GitHub token, you get 60 requests/hour. For development, create a token and add it to `.env.local`:
  ```
  VITE_GITHUB_API_TOKEN=your_personal_access_token
  ```

- **Deployment Considerations:**
  - The app is fully static after build
  - No server-side processing required
  - Can be deployed to any static hosting
  - Build output is in `dist/` directory

- **Performance:**
  - Search is debounced (300ms) to reduce API calls
  - Pagination limits results to 30 per page
  - Lazy loading of images
  - Code splitting handled by Vite

- **Browser Support:**
  - Chrome, Firefox, Safari, Edge (all recent versions)
  - Mobile browsers fully supported

## Support

For questions or issues:
1. Review the README.md for detailed feature documentation
2. Check TypeScript types in `src/types/`
3. Review Redux slices in `src/store/slices/`
4. Examine component implementations in `src/components/`

## Timeline

- **Challenge Start:** [Date]
- **Submission Deadline:** [Date + 1 week]
- **Bonus Tasks:** Highly encouraged if time permits

Good luck with your submission!
