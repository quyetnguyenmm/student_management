import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}
