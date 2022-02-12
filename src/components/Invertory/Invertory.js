import { useEffect, useReducer } from 'react';

import styles from './Invertory.module.scss';
import InventoryTable from '../shared/InventoryTable/InventoryTable';
import Search from '../shared/Search/Search';

const specialCharsRegex = /[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_\s]/g;
let searchTimer;

const Invertory = ({
  titles = [],
  isTitlesReady = false,
  onGetTitles = () => {},
  onSetProgrammable = () => {},
}) => {
  const [{ searchText, searchResults }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    {
      searchText: '',
      searchResults: [],
    }
  );

  const runSearch = () => {
    const processedKeyword = searchText
      .toLowerCase()
      .replace(specialCharsRegex, '');
    const nextResults = titles
      ?.map(title => {
        const filteredSeasons = title.seasons
          ?.map(season => {
            const filteredEpisodes = season.episodes?.filter(episode =>
              episode.episode_name
                ?.toLowerCase()
                .replace(specialCharsRegex, '')
                .includes(processedKeyword)
            );

            if (
              !season.season_name
                ?.toLowerCase()
                .replace(specialCharsRegex, '')
                .includes(processedKeyword) &&
              !filteredEpisodes?.length
            ) {
              return null;
            }

            const tempSeason = { ...season };
            if (!!filteredEpisodes?.length) {
              tempSeason.episodes = filteredEpisodes;
            }
            return tempSeason;
          })
          .filter(a => !!a);

        if (
          !title.title_name
            ?.toLowerCase()
            .replace(specialCharsRegex, '')
            .includes(processedKeyword) &&
          !filteredSeasons?.length
        ) {
          return null;
        }

        const tempTitle = { ...title };
        if (!!filteredSeasons?.length) {
          tempTitle.seasons = filteredSeasons;
        }
        return tempTitle;
      })
      .filter(a => !!a);

    setState({ searchResults: nextResults });
  };

  useEffect(() => {
    onGetTitles();
  }, []);

  useEffect(() => {
    if (!!searchTimer) {
      clearTimeout(searchTimer);
    }
    if (!searchText.trim().length) {
      return setState({ searchResults: [] });
    }
    searchTimer = setTimeout(runSearch, 300); // throttling
  }, [searchText]);

  useEffect(() => {
    if (!!searchTimer) {
      clearTimeout(searchTimer);
    }
    if (!!searchText.trim()) {
      searchTimer = setTimeout(runSearch, 0);
    }
  }, [titles]);

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
            titles={!!searchText.trim() ? searchResults : titles}
            onSetProgrammable={onSetProgrammable}
          />
        )}
      </div>
    </div>
  );
};

export default Invertory;
