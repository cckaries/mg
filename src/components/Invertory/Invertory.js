import { useEffect, useReducer } from 'react';

import styles from './Invertory.module.scss';
import InventoryTable from '../shared/InventoryTable/InventoryTable';
import Search from '../shared/Search/Search';

let searchTimer;

const Invertory = ({
  titles = [],
  isTitlesReady = false,
  onGetTitles = () => {},
  onSetProgrammable = () => {},
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
      const processedKeyword = searchText
        .toLowerCase()
        .replace(specialCharsRegex, '');
      const nextProcessedTitles = titles
        ?.map(title => {
          const processedSeasons = title.seasons
            ?.map(season => {
              const processedEpisodes = season.episodes?.filter(episode =>
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
                !processedEpisodes?.length
              ) {
                return null;
              }

              const tempSeason = { ...season };
              if (!!processedEpisodes?.length) {
                tempSeason.episodes = processedEpisodes;
              }
              return tempSeason;
            })
            .filter(a => !!a);

          if (
            !title.title_name
              ?.toLowerCase()
              .replace(specialCharsRegex, '')
              .includes(processedKeyword) &&
            !processedSeasons?.length
          ) {
            return null;
          }

          const tempTitle = { ...title };
          if (!!processedSeasons?.length) {
            tempTitle.seasons = processedSeasons;
          }
          return tempTitle;
        })
        .filter(a => !!a);

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
            onSetProgrammable={onSetProgrammable}
          />
        )}
      </div>
    </div>
  );
};

export default Invertory;
