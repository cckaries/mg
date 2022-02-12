import { useEffect, useReducer } from 'react';
import cx from 'classnames';

import styles from './Invertory.module.scss';
import InventoryTable from '../shared/InventoryTable/InventoryTable';
import Search from '../shared/Search/Search';

const Invertory = props => {
  const [{ isPageReady, searchText }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    { isPageReady: false, searchText: '' }
  );

  return (
    <div id="container" className={styles.Container}>
      <h1>Invertory Manager</h1>
      <div className={styles.Search}>
        <Search placeholder="Search for titles in inventory" />
      </div>
      <div className={styles.Table}>
        <InventoryTable titles={titles} />
      </div>
    </div>
  );
};

export default Invertory;
