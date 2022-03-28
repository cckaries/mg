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

  const processString = (text = '') => {
    return text.replace(specialCharsRegex, '').toLowerCase();
  };

  const runSearch = () => {
    const processedKeyword = processString(searchText);
    const nextResults = titles
      ?.map(title => {
        const filteredSeasons = title.seasons
          ?.map(season => {
            const filteredEpisodes = season.episodes?.filter(episode =>
              processString(episode.episode_name).includes(processedKeyword)
            );

            if (
              !processString(season.season_name).includes(processedKeyword) &&
              !filteredEpisodes?.length
            ) {
              return null;
            }

            return {
              ...season,
              episodes: !!filteredEpisodes?.length
                ? filteredEpisodes
                : season.episodes,
            };
          })
          .filter(a => !!a);

        if (
          !processString(title.title_name).includes(processedKeyword) &&
          !filteredSeasons?.length
        ) {
          return null;
        }

        return {
          ...title,
          seasons: !!filteredSeasons?.length ? filteredSeasons : title.seasons,
        };
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
