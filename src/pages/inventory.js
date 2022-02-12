import { useSelector, useDispatch } from 'react-redux';

import Invertory from '../components/Invertory/Invertory';
import { getTitlesThunk,  titlesActions } from '../store/titles';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { titles, isTitlesReady } = useSelector(state => state.titles);

  return (
    <Invertory
      titles={titles}
      isTitlesReady={isTitlesReady}
      onGetTitles={() => dispatch(getTitlesThunk())}
      onSetProgrammable={(payload) => dispatch(titlesActions.setProgrammable(payload))}
    />
  );
};

export default InventoryPage;
