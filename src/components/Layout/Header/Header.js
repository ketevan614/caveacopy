import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'

import './header.css'

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let logedIn = null;
    const handleChange = (e) => {
        let value = null;
        if (e.key === 'Enter' ) {
            value = e.target.value;
           
        }
        else if (e.type === 'click') {
            value = document.querySelector('.search input').value;
        }
        
        if (value) {
            navigate(`?input=${value}`, { state: { value } });
        }
    };
    const user = () => {
        logedIn = users.find(element => element.login);
        return logedIn || null;
    }
    const handleLogOut = () => {
        logedIn.login = false;
        localStorage.setItem('users', JSON.stringify(users))
    }
    const clearInput = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('input');
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

    return (
        <header>
            <nav className='header-navigation'>
                <ul>
                    <li>
                        <h1><Link to='/'>
                            <span className="material-symbols-outlined logo" >
                                camera
                            </span>
                        </Link>
                        </h1>
                    </li>
                    <li>
                        <Link
                            to='/'
                            className={location.pathname === '/' ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/movies'
                            className={location.pathname === '/movies' ? 'active' : ''}>
                            Movies
                        </Link>
                    </li>

                    <li>
                        <Link
                            to='/favourites'
                            className={location.pathname === '/favourites' ? 'active' : ''}>
                            Favourites
                        </Link>
                    </li>
                </ul>
                <div>
                    <div className='search'>
                        <input type='text' placeholder='search here...' onKeyDown={handleChange}></input>
                        <span className="material-symbols-outlined search-icon" onClick={handleChange}>
                            search
                        </span>
                        <span class="material-symbols-outlined remove-icon" onClick={clearInput}>
                            close
                        </span>
                    </div>
                    {user() === null ? (
                        <div className='authorization'>
                            <Link
                                to='/login'
                                className={location.pathname === '/login' ? 'active log-in' : 'log-in'}>
                                Log In
                            </Link>
                            <Link
                                to='/register'
                                className={location.pathname === '/register' ? 'active register' : 'register'}>
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className='username'>
                            <p>{user().username}</p>
                            <div className='authorization'>
                                <Link
                                    to='/'
                                    className={location.pathname === '/login' ? 'active log-in' : 'log-in'} onClick={handleLogOut}>
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </nav>

        </header>
    )
}
export default Header;