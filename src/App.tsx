import { Header } from "@components/Header"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import { Box, createTheme, CssBaseline, IconButton, ThemeProvider } from "@mui/material"
import { LikedPage } from "@pages/LikedPage"
import { SearchPage } from "@pages/SearchPage"
import { UserDetailPage } from "@pages/UserDetailPage"
import { persistor, store } from "@/store/index"
import { useState } from "react"
import { Provider } from "react-redux"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#0969da",
		},
		secondary: {
			main: "#6f42c1",
		},
	},
})

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#58a6ff",
		},
		secondary: {
			main: "#79c0ff",
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
				<Box sx={{ minHeight: "100vh" }}>
					<Header />
					<Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
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
