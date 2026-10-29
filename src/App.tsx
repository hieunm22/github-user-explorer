import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@store/index'
import { Header } from '@components/Header'
import { SearchPage } from '@pages/SearchPage'
import { LikedPage } from '@pages/LikedPage'
import { UserDetailPage } from '@pages/UserDetailPage'
import { useState } from 'react'
import { IconButton, Box } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0969da',
    },
    secondary: {
      main: '#6f42c1',
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#79c0ff',
    },
  },
})

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/users/:username" element={<UserDetailPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}
