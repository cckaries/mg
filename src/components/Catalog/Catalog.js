import { useEffect, useReducer } from 'react';
import cx from 'classnames';

import styles from './Catalog.module.scss';

const Catalog = props => {
  const [{ isPageReady }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    { isPageReady: false }
  );

  return (
    <div id="container" className={styles.Container}>
      catalog component
    </div>
  );
};

export default Catalog;
