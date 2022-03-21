import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';
import { authOperations } from '../redux/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RegisterView from '../views/RegisterView';
import LoginView from '../views/LoginView';
import CabinetView from '../views/CabinetView';
import Loader from './Loader';

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => dispatch(authOperations.fetchCurrentUser()), [dispatch]);
  return !isFetchingCurrentUser ? (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegisterView replace to="/login" />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginView replace to="/" />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navigate replace to="/cabinet" />
              </PrivateRoute>
            }
          />
          <Route
            path="/cabinet"
            element={
              <PrivateRoute>
                <CabinetView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  ) : (
    <Loader />
  );
}

export default App;
