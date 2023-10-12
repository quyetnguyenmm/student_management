import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/addEditPage';
import ListPage from './pages/listPage';

export default function Students() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCity());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path={match.path}>
        <ListPage />
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/edit/:studentId`}>
        <AddEditPage />
      </Route>

      <Redirect to={match.path} />
    </Switch>
  );
}
