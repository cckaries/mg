import { createSlice } from '@reduxjs/toolkit';

const titlesSlice = createSlice({
  name: 'titles',
  initialState: { titles: [], isTitlesReady: false },
  reducers: {
    setIsTitlesReady(state, action) {
      state.isTitlesReady = action.payload
    },
    setTitles(state, action) {
      state.titles = action.payload;
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

// export const putTitlesThunk = payload => {
//   return async dispatch => {
//     const putTitles = async () => {
//       const res = await fetch(
//         'https://migo-7cc35-default-rtdb.firebaseio.com/titles.json',
//         {
//           method: 'PUT',
//           body: JSON.stringify({
//             titles: payload,
//           }),
//         }
//       );

//       if (!res.ok) throw new Error('Error: Failed to update DB');
//     };

//     try {
//       await putTitles();
//       const resJson = await getTitlesThunk();
//       console.log('res:', resJson);
//       dispatch(titlesActions.setTitles(resJson));
//     } catch (err) {
//       throw new Error('ERROR:', err);
//     }
//   };
// };

export const titlesActions = titlesSlice.actions;
export default titlesSlice.reducer;
