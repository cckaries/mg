import { useSelector, useDispatch } from 'react-redux';

import Invertory from '../components/Invertory/Invertory';
import { getTitlesThunk } from '../store/titles';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { titles, isTitlesReady } = useSelector(state => state.titles);

  return (
    <Invertory
      titles={titles}
      isTitlesReady={isTitlesReady}
      onGetTitles={() => dispatch(getTitlesThunk())}
    />
  );
};

export default InventoryPage;
