import { NotFound, PrivateRoute } from 'components/common';
import AdminLayout from 'components/layout/admin';
import LoginPage from 'features/auth/pages/loginPage';
import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Redirect from="/" to="/admin" />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}
