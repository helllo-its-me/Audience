import { NavLink, useLocation } from 'react-router-dom'
import LOGO from './LOGO.png'
import './Header.css'

const Header = () => {
  let location = useLocation()

  return (
    <div className='header'>
      <div className='headerName'>
        <img src={LOGO} alt='logo' />
      </div>

      <div className='navigation'>
        {/* <NavLink
          className={location.pathname.includes('profiling') ? 'active' : ''}
          to={`/profiling`}>
          Profiling
        </NavLink> */}
        {/* <NavLink
          className={location.pathname.includes('audiences') ? 'active' : ''}
          to={`/audiences`}>
          Audiences
        </NavLink> */}
      </div>
    </div>
  )
}

export default Header
