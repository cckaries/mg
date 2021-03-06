import { useReducer, Fragment } from 'react';

import styles from './InventoryTable.module.scss';
import Tr from './Tr/Tr';

const InventoryTable = ({ titles = [], onSetProgrammable = () => {} }) => {
  const [{ expandedTitleIds, expandedSeasonIds }, setState] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    { expandedTitleIds: [], expandedSeasonIds: [] }
  );

  const trDom = ({
    key,
    id,
    name = '-',
    type = 'Movie',
    season = '-',
    episode = '-',
    published = '-',
    isProgrammable = false,
    hasChildren = false,
    isAllChildrenProgrammable = false,
    isExpanded = false,
    isHidden = false,
    onExpandButtonClick = () => {},
    onProgrammableButtonClick = () => {},
  }) => (
    <Tr
      key={key}
      id={id}
      name={name}
      type={type}
      season={season}
      episode={episode}
      published={published}
      isProgrammable={isProgrammable}
      hasChildren={hasChildren}
      isAllChildrenProgrammable={isAllChildrenProgrammable}
      isExpanded={isExpanded}
      isHideable={type === 'Season' || type === 'Episode'}
      isHidden={isHidden}
      onExpandButtonClick={onExpandButtonClick}
      onProgrammableButtonClick={onProgrammableButtonClick}
    />
  );

  const episodesDom = ({ titleId, seasonId, episodes = [] }) =>
    episodes.map(episode => {
      const episodeId = episode.episode_id;

      return trDom({
        key: `${titleId}-${seasonId}-${episode.episode_id}`,
        id: episodeId,
        name: episode.episode_name,
        type: 'Episode',
        episode: episode.episode_name || episode.episode_number,
        published: episode.publish_timestamp,
        isProgrammable: episode.activate,
        isHidden:
          !expandedTitleIds.includes(titleId) ||
          !expandedSeasonIds.includes(seasonId),
        onProgrammableButtonClick: state =>
          onSetProgrammable({ state, titleId, seasonId, episodeId }),
      });
    });

  const seasonsDom = ({ titleId, seasons = [] }) =>
    seasons.map(season => {
      const seasonId = season.season_id;
      const hasEpisodes = !!season.episodes?.length;

      return (
        <Fragment key={`${titleId}-${seasonId}`}>
          {trDom({
            key: `${titleId}-${seasonId}`,
            id: seasonId,
            name: season.season_name,
            type: 'Season',
            episode: season.episode_count,
            season: season.season_name || season.season_number,
            published: season.publish_timestamp,
            isProgrammable: season.activate,
            hasChildren: hasEpisodes,
            isAllChildrenProgrammable:
              hasEpisodes &&
              !season.episodes.find(episode => !episode.activate),
            isExpanded: expandedSeasonIds.includes(seasonId),
            isHidden: !expandedTitleIds.includes(titleId),
            onExpandButtonClick: () => {
              let nextExpandedSeasonIds = [...expandedSeasonIds];

              if (nextExpandedSeasonIds.includes(seasonId)) {
                nextExpandedSeasonIds = nextExpandedSeasonIds.filter(
                  id => id !== seasonId
                );
              } else {
                nextExpandedSeasonIds.push(seasonId);
              }

              setState({
                expandedSeasonIds: nextExpandedSeasonIds,
              });
            },
            onProgrammableButtonClick: state =>
              onSetProgrammable({ state, titleId, seasonId }),
          })}
          {hasEpisodes &&
            episodesDom({ titleId, seasonId, episodes: season.episodes })}
        </Fragment>
      );
    });

  const titlesDom = titles.map(title => {
    const titleId = title.title_id;
    const hasSeasons =
      title.content_type === 'Series' && !!title.seasons?.length;

    return (
      <Fragment key={titleId}>
        {trDom({
          key: titleId,
          id: titleId,
          name: title.title_name,
          type: title.content_type,
          season: title.seasons?.length,
          episode: title.episode_count,
          published: title.publish_timestamp,
          isProgrammable: title.activate,
          hasChildren: hasSeasons,
          isAllChildrenProgrammable:
            hasSeasons && !title.seasons.find(season => !season.activate),
          isExpanded: expandedTitleIds.includes(titleId),
          onExpandButtonClick: () => {
            let nextExpandedTitleIds = [...expandedTitleIds];

            if (nextExpandedTitleIds.includes(titleId)) {
              nextExpandedTitleIds = nextExpandedTitleIds.filter(
                id => id !== titleId
              );
            } else {
              nextExpandedTitleIds.push(titleId);
            }

            setState({
              expandedTitleIds: nextExpandedTitleIds,
            });
          },
          onProgrammableButtonClick: state =>
            onSetProgrammable({ state, titleId }),
        })}
        {hasSeasons && seasonsDom({ titleId, seasons: title.seasons })}
      </Fragment>
    );
  });

  return (
    <table className={styles.Container}>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Title Name</th>
          <th>Type</th>
          <th>Season</th>
          <th>Episode</th>
          <th>Published</th>
          <th>Programmable</th>
        </tr>
      </thead>
      <tbody>{titlesDom}</tbody>
    </table>
  );
};

export default InventoryTable;
