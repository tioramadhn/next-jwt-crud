import Layout from '../components/Layout'
import '../styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { orange, pink } from '@mui/material/colors';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

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
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp



