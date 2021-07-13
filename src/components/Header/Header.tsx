import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { Actions, AppContext } from '../../store/Store';
import localStyles from './Header.module.css';
import globalStyles from '../../App.module.css';
import Nav from '../Nav/Nav';

interface Props {
  title: string;
}

const Header = ({title}: Props) => {
  const {state, dispatch} = useContext(AppContext);
  const [showNav, setShowNav] = useState<boolean>(false);
  
  return (
    <header className={`${localStyles.header} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
        <div className={`${globalStyles.flex} ${globalStyles.flex1} ${globalStyles.flexCenterVer}`}>
          <button className={`${localStyles.menuToggle} ${showNav ? localStyles.menuToggleOpen : ''} ${globalStyles.visibleSm}`} onClick={() => setShowNav(!showNav)}></button>
          <h1 className={globalStyles.fontSize5}>{title}</h1>
        </div>
        <Button type="toggle" color="secondary" label="Temperature unit" toggleLabel={['°F','°C']}
          activeLabel={state.unit} action={() => dispatch({type: Actions.UNIT_Toggle, payload: state.unit === '°F' ? '°C' : '°F'})} />
        
        <div className={`${localStyles.navBox} ${showNav ? localStyles.navBoxOpen : ''} ${globalStyles.visibleSm}`}
          onClick={() => {setShowNav(false)}}>
          <Nav close={() => setShowNav(false)} mobile={true} />
        </div>
    </header>
  );
}

export default Header;
