import { useReducer, useRef } from 'react';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';

const Search = ({ placeholder = '', onChange = () => {} }) => {
  const [{ isFocused }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    { isFocused: false }
  );
  const inputRef = useRef();

  return (
    <div
      className={cx(styles.Container, isFocused && styles.active)}
      onClick={() => inputRef.current.focus()}
    >
      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      <input
        ref={inputRef}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setState({ isFocused: true })}
        onBlur={() => setState({ isFocused: false })}
      />
    </div>
  );
};

export default Search;
