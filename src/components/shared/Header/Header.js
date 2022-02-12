import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import styles from './Header.module.scss';
import logoSvg from '../../../assets/logo.svg';

const Header = () => {
  return (
    <header className={styles.Container}>
      <div className={styles.Logo}>
        <img src={logoSvg} alt="logo" />
      </div>
      <div className={styles.Navbar}>
        <div className={cx(styles.Nav, styles.active)}>
          <FontAwesomeIcon icon="fa-solid fa-house" />
          <span>Inventory</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
