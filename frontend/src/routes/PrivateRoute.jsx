import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';

const PrivateRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
