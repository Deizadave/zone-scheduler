import { useState } from 'react';
import localStyles from './Nav.module.css';
import globalStyles from '../../App.module.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();  

  return (
    <nav className={localStyles.nav}>
        <div className={`${localStyles.navContent} ${open ? localStyles.navContentOpen : ''}`}>
            <button className={localStyles.menuToggle} title="Menu button" onClick={() => setOpen(!open)}></button>
            <ul className={localStyles.menu}>
              <li>
                <Link to="/" onClick={() => setOpen(false)} className={`${localStyles.menuItem} ${globalStyles.fontSize2} ${location.pathname === "/" ? localStyles.menuItemActive : ''}`}>
                  <span className={`${localStyles.menuItemIcon} ${globalStyles.flex} ${globalStyles.flexCenter} material-icons-round`}>alarm</span>
                  Schedules
                </Link>
              </li>
              <li>
                <Link to="/zones" onClick={() => setOpen(false)} className={`${localStyles.menuItem} ${globalStyles.fontSize2} ${location.pathname === "zones" ? localStyles.menuItemActive : ''}`}>
                  <span className={`${localStyles.menuItemIcon} ${globalStyles.flex} ${globalStyles.flexCenter} material-icons-round`}>pin_drop</span>
                  Zones
                </Link>
              </li>
            </ul>
        </div>
    </nav>
  );
}

export default Nav;
