import { CssBaseline } from '@mui/material';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from 'utils/history';
import App from './App';
import { store } from './app/store';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </Router>
  </Provider>,
);
