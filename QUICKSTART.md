# Quick Start Guide

Get the GitHub User Explorer running in 5 minutes!

## 🚀 Quick Setup

### 1. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens automatically at http://localhost:5173

### 2. Test Features

**Search Users:**
- Type a GitHub username (e.g., "torvalds", "gvanrossum", "dhh")
- Results appear as you type
- Results are paginated (30 per page max)

**Like Users:**
- Click the heart icon on any user card
- Liked users saved permanently in your browser
- View all liked users in the "Liked" tab

**View Profiles:**
- Click any user card to see their full profile
- View repositories, followers, and following lists
- Access links to GitHub profiles

**Dark Mode:**
- Click sun/moon icon in top right
- Switches between light and dark themes

## 🎯 Key Features

✅ **Search** - Type to find GitHub users  
✅ **Like** - Save favorite users  
✅ **Persist** - Data saved across browser sessions  
✅ **Profiles** - View detailed user information  
✅ **Responsive** - Works on mobile and desktop  
✅ **Dark Mode** - Built-in theme toggle  
✅ **Share** - URLs preserve your state  

## 🔧 Available Commands

```bash
npm run dev           # Start development (http://localhost:5173)
npm run build         # Build for production
npm run preview       # Preview production build
npm run type-check    # Check TypeScript types
npm run lint          # Run ESLint
```

## 📝 Environment (Optional)

For higher API rate limits, create `.env.local`:

```env
VITE_GITHUB_API_TOKEN=your_github_token
```

Get a token at: https://github.com/settings/tokens

**Without token:** 60 requests/hour  
**With token:** 5,000 requests/hour

## 📚 Detailed Docs

- **README.md** - Full feature documentation
- **ARCHITECTURE.md** - Design decisions and structure
- **DEVELOPMENT.md** - Development & testing guide
- **SUBMISSION.md** - Submission instructions

## ❓ Troubleshooting

**Port 5173 already in use?**
```bash
# Vite will use next available port, check terminal for URL
```

**API rate limit exceeded?**
- Add GitHub token to `.env.local`
- Wait 1 hour for limit reset

**Liked users not persisting?**
- Check browser hasn't disabled localStorage
- Try different browser if issue persists

**TypeScript errors after clone?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run type-check
```

## 🎨 Tech Stack

- React 18 + TypeScript
- Redux Toolkit (state management)
- Material-UI (components)
- Vite (build tool)
- Axios (API client)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🔗 Useful Links

- [GitHub API Docs](https://docs.github.com/en/rest)
- [React Docs](https://react.dev)
- [Redux Docs](https://redux.js.org)
- [Material-UI](https://mui.com)

## 💡 Tips

1. **Search Tips:**
   - Search by username, not name
   - Use popular names to test: "torvalds", "gvanrossum"
   - Check pagination for large result sets

2. **Performance:**
   - App uses search debounce (300ms delay)
   - Reduces API calls while typing
   - Faster browsing with fewer requests

3. **Sharing:**
   - URLs preserve search query
   - Share links with friends
   - Copy URL to resume searches

4. **Data Persistence:**
   - Only liked users are saved
   - Stored in browser's localStorage
   - Not sent to any server
   - Can be cleared in browser settings

## 🚀 Ready to Deploy?

```bash
# Build for production
npm run build

# Upload `dist/` folder to:
# - Vercel (easiest for Vite)
# - Netlify
# - GitHub Pages
# - AWS Amplify
# - Any static hosting

# Get deployment URL and share!
```

## 📞 Need Help?

1. Check DEVELOPMENT.md for troubleshooting
2. Review ARCHITECTURE.md for technical details
3. Check the README.md for feature documentation

---

**Happy exploring! 🔍**

Questions or feedback? Check the Oddle Frontend Challenge guidelines.
