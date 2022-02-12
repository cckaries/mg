import cx from 'classnames';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Tr.module.scss';

const Tr = ({
  id,
  name = '-',
  type = 'Movie',
  season = '-',
  episode = '-',
  published = '-',
  isProgrammable = false,
  hasChildren = false,
  isExpanded = false,
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
      programmableLabel = 'All Episode';
      break;
    case 'Series':
      programmableLabel = 'All Seasons';
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
        isHidden && styles.hidden
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
      <td onClick={onProgrammableButtonClick}>
        <button
          className={cx(styles.Toggle, isProgrammable && styles.enabled)}
          onClick={() => {}}
        >
          {isProgrammable.toString()}
        </button>
        <span>{programmableLabel}</span>
      </td>
    </tr>
  );
};

export default Tr;
