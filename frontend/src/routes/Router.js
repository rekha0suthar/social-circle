import { Routes, Route } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import PostForm from '../components/PostForm';
import Dashboard from '../components/Dashboard';
import PostEdit from '../components/PostEdit';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route Component={ProtectedRoute}>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/post" Component={PostForm} />
        <Route path="/post/:id" Component={PostEdit} />
      </Route>
    </Routes>
  );
};

export default Router;
