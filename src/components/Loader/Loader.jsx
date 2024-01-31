import { Circles } from 'react-loader-spinner';
import styles from './loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <Circles
      height="80"
      width="80"
      color="#3f51b5"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default Loader;
