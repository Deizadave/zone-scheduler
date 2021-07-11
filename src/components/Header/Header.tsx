import localStyles from './Header.module.css';
import globalStyles from '../../App.module.css';
import Button from '../Button/Button';

interface Props {
  title: string;
}

const Header = ({title}: Props) => {
  return (
    <header className={`${localStyles.header} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
        <h1 className={globalStyles.fontSize5}>{title}</h1>
        <Button type="toggle" color="secondary" label="Temperature unit" toggleLabel={['°F','°C']} />
    </header>
  );
}

export default Header;
