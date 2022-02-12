import { useEffect, useReducer } from 'react';
import cx from 'classnames';

import styles from './Invertory.module.scss';
import Search from '../shared/Search/Search';
import Table from '../shared/Table/Table';

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
        <Table />
      </div>
    </div>
  );
};

export default Invertory;
