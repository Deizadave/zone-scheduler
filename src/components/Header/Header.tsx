import Button from '../Button/Button';
import { useContext } from 'react';
import { Actions, AppContext } from '../../store/Store';
import localStyles from './Header.module.css';
import globalStyles from '../../App.module.css';

interface Props {
  title: string;
}

const Header = ({title}: Props) => {
  const {state, dispatch} = useContext(AppContext);
  
  return (
    <header className={`${localStyles.header} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
        <h1 className={globalStyles.fontSize5}>{title}</h1>
        <Button type="toggle" color="secondary" label="Temperature unit" toggleLabel={['°F','°C']}
          activeLabel={state.unit} action={() => dispatch({type: Actions.UNIT_Toggle, payload: state.unit === '°F' ? '°C' : '°F'})} />
    </header>
  );
}

export default Header;
