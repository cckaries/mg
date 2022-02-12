import cx from 'classnames';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Tr.module.scss';
import Toggle from '../../Toggle/Toggle';

const Tr = ({
  id,
  name = '-',
  type = 'Movie',
  season = '-',
  episode = '-',
  published = '-',
  isProgrammable = false,
  isAllChildrenProgrammable = false,
  hasChildren = false,
  isExpanded = false,
  isHideable = false,
  isHidden = false,
  onExpandButtonClick = () => {},
  onProgrammableButtonClick = () => {},
}) => {
  let programmableLabel;

  switch (type) {
    case 'Episode':
      programmableLabel = 'Per Episode';
      break;
    case 'Season':
      if (isAllChildrenProgrammable) {
        programmableLabel = 'All Episodes';
      }
      break;
    case 'Series':
      if (isAllChildrenProgrammable) {
        programmableLabel = 'All Seasons';
      }
      break;
    default:
      programmableLabel = 'Single Movie';
      break;
  }

  return (
    <tr
      id={id}
      className={cx(
        styles.Container,
        styles[type],
        hasChildren && styles.hasChildren,
        isHidden ? styles.hidden : isHideable && styles.shown
      )}
    >
      <td>
        <div
          className={cx(styles.Icon, isExpanded && styles.expanded)}
          onClick={onExpandButtonClick}
        >
          {hasChildren && <FontAwesomeIcon icon="fa-solid fa-caret-right" />}
        </div>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{season}</td>
      <td>{episode}</td>
      <td>{format(published, 'MMM. d, yyyy')}</td>
      <td>
        <Toggle checked={isProgrammable} onChange={onProgrammableButtonClick} />
        <div className={styles.ProgrammableLabel}>{programmableLabel}</div>
      </td>
    </tr>
  );
};

export default Tr;
