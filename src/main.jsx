import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './stores/store.js';
import './styles/styles.scss'

// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './theme/customTheme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <ThemeProvider theme={theme}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ThemeProvider> */}
  </BrowserRouter>
)
