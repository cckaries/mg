import styles from './Table.module.scss';

const Table = props => {
  return (
    <table className={styles.Container}>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Title Name</th>
          <th>Season</th>
          <th>Episode</th>
          <th>Published</th>
          <th>Programmable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>ID</td>
          <td>Title Name</td>
          <td>Season</td>
          <td>Episode</td>
          <td>Published</td>
          <td>Programmable</td>
        </tr>
        <tr>
          <td></td>
          <td>ID</td>
          <td>Title Name</td>
          <td>Season</td>
          <td>Episode</td>
          <td>Published</td>
          <td>Programmable</td>
        </tr>
        <tr className={styles.season}>
          <td></td>
          <td>ID</td>
          <td>Title Name</td>
          <td>Season</td>
          <td>Episode</td>
          <td>Published</td>
          <td>Programmable</td>
        </tr>
        <tr className={styles.episode}>
          <td></td>
          <td>ID</td>
          <td>Title Name</td>
          <td>Season</td>
          <td>Episode</td>
          <td>Published</td>
          <td>Programmable</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
