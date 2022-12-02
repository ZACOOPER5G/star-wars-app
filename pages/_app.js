import Layout from '../components/Layout';
import '../styles/global.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
		</Layout>
	)
}

export default MyApp
