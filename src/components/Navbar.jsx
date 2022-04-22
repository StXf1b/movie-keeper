// styles
import './Navbar.css';
import Movie from "../assets/movie.svg"
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Movie} alt="Movie Logo" />
          <span>Movie Keeper</span>
        </li>
        {!user && (
          <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
          )}
        {user && (
          <>
          <p className='hello-user'>Hello, {user.displayName}</p>
          <li>
            {!isPending && <button className='btn' onClick={logout}>Logout</button>}
            {isPending && <button className='btn-disabled' disabled>Logging out...</button>}
          </li>
        </>
        )}
      </ul>
    </div>
  )
}
