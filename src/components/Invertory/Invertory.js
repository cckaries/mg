import { useEffect, useReducer } from 'react';

import styles from './Invertory.module.scss';
import InventoryTable from '../shared/InventoryTable/InventoryTable';
import Search from '../shared/Search/Search';

let searchTimer;

const Invertory = ({
  titles = [],
  isTitlesReady = false,
  onGetTitles = () => {},
}) => {
  const [{ searchText, processedTitles }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    {
      searchText: '',
      processedTitles: [],
    }
  );

  useEffect(() => {
    onGetTitles();
  }, []);

  useEffect(() => {
    if (!!searchTimer) clearTimeout(searchTimer);
    if (!searchText.trim().length) return setState({ processedTitles: [] });
    searchTimer = setTimeout(() => {
      const specialCharsRegex = /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_\s]/g;
      const nextProcessedTitles = titles.filter(title =>
        title.title_name
          ?.toLowerCase()
          .replace(specialCharsRegex, '')
          .includes(searchText.toLowerCase().replace(specialCharsRegex, ''))
      );

      setState({ processedTitles: nextProcessedTitles });
    }, 300); // throttling
  }, [searchText]);

  return (
    <div id="container" className={styles.Container}>
      <h1>Invertory Manager</h1>
      <div className={styles.Search}>
        <Search
          placeholder="Search for titles in inventory"
          onChange={e => setState({ searchText: e.target.value })}
        />
      </div>
      <div className={styles.Table}>
        {!isTitlesReady ? (
          <div>Loading...</div>
        ) : (
          <InventoryTable
            titles={!!searchText.trim() ? processedTitles : titles}
          />
        )}
      </div>
    </div>
  );
};

export default Invertory;
