import { useState, useEffect, useRef } from 'react';

import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({
      search: '',
    });
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          name="search"
          type="text"
          value={state.search}
          onChange={handleChange}
          ref={inputRef}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.setState({
//       search: '',
//     });
//   };

//   render() {
//     const { handleChange, handleSubmit } = this;
//     const { search } = this.state;

//     return (
//       <header className={styles.searchbar}>
//         <form onSubmit={handleSubmit} className={styles.searchForm}>
//           <button type="submit" className={styles.searchFormButton}>
//             <span className={styles.searchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={styles.searchFormInput}
//             name="search"
//             type="text"
//             value={search}
//             onChange={handleChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             required
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
