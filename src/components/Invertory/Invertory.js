import { useEffect, useReducer } from 'react';
import cx from 'classnames';

import styles from './Invertory.module.scss';

const Invertory = props => {
  const [{ isPageReady }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    { isPageReady: false }
  );

  return (
    <div id="container" className={styles.Container}>
      Invertory Manager
    </div>
  );
};

export default Invertory;
