import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isManager = false;
  let isAdmin = false;
  let status = "employee";
  let username = '';
  let roles = [];

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const userInfo = decoded?.UserInfo;

      if (userInfo) {
        username = userInfo.username || '';
        roles = userInfo.roles || [];

        isManager = roles.includes('manager');
        isAdmin = roles.includes('admin');

        if (isAdmin) {
          status = "admin";
        } else if (isManager) {
          status = "manager";
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return { username, roles, status, isManager, isAdmin };
};

export default useAuth;
