import Layout from '../components/Layout'
import '../styles/globals.css'
import { orange, pink } from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import AuthProvider from '../stores/authContext';

let myTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
})

myTheme = responsiveFontSizes(myTheme)

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={myTheme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp



