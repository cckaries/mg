import { createSlice } from '@reduxjs/toolkit';

const titlesSlice = createSlice({
  name: 'titles',
  initialState: { titles: [], isTitlesReady: false },
  reducers: {
    setIsTitlesReady(state, action) {
      state.isTitlesReady = action.payload;
    },
    setTitles(state, action) {
      state.titles = action.payload;
    },
    setProgrammable(state, action) {
      const { titleId, seasonId, episodeId } = action.payload;
      const type = !!episodeId ? 'Episode' : !!seasonId ? 'Season' : 'Title';
      let nextTitles = [...state.titles];
      let titleIdx = nextTitles.findIndex(title => title.title_id === titleId);
      let seasonIdx =
        !!seasonId &&
        nextTitles[titleIdx].seasons.findIndex(
          season => season.season_id === seasonId
        );
      let episodeIdx =
        !!episodeId &&
        nextTitles[titleIdx].seasons[seasonIdx].episodes.findIndex(
          episode => episode.episode_id === episodeId
        );

      switch (type) {
        case 'Episode':
          nextTitles[titleIdx].seasons[seasonIdx].episodes[
            episodeIdx
          ].activate = action.payload.state;

          if (!!action.payload.state) {
            nextTitles[titleIdx].seasons[seasonIdx].activate = true;
            nextTitles[titleIdx].activate = true;
          }
          break;
        case 'Season':
          nextTitles[titleIdx].seasons[seasonIdx].activate =
            action.payload.state;
          nextTitles[titleIdx].seasons[seasonIdx].episodes.map(
            episode => (episode.activate = action.payload.state)
          );

          if (!!action.payload.state) {
            nextTitles[titleIdx].activate = true;
          }
          break;
        default:
          nextTitles[titleIdx].activate = action.payload.state;
          nextTitles[titleIdx].seasons?.map(season => {
            season.activate = action.payload.state;
            return season.episodes.map(
              episode => (episode.activate = action.payload.state)
            );
          });
          break;
      }

      state.titles = nextTitles;
    },
  },
});

export const getTitlesThunk = () => {
  return async dispatch => {
    dispatch(titlesActions.setIsTitlesReady(false));

    const getTitles = async () => {
      const res = await fetch(
        'https://migo-7cc35-default-rtdb.firebaseio.com/titles.json'
      );

      return res.json();
    };

    try {
      const resJson = await getTitles();
      dispatch(titlesActions.setTitles(resJson));
      dispatch(titlesActions.setIsTitlesReady(true));
    } catch (err) {
      throw new Error('ERROR:', err);
    }
  };
};

export const titlesActions = titlesSlice.actions;
export default titlesSlice.reducer;
