import { useContext } from 'react';
import './styles.css';
import { AuthContext } from '../../auth/Context';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return <button className="logout-button" onClick={logout}>Logout</button>;
}
