import styles from './Toggle.module.scss';

const Toggle = ({ checked, defaultChecked, onChange = () => {} }) => {
  return (
    <label className={styles.Wrapper}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={e => onChange(e.target.checked)}
      />
      <div className={styles.Slider} />
    </label>
  );
};

export default Toggle;
