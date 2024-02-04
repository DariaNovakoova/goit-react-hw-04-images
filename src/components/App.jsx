import { useEffect, useState } from 'react';
import { searchImg } from 'api/getImg';
import styles from './app.module.css';

import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

const App = () => {
  const [search, setSearch] = useState('');
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgDetails, setImgDetails] = useState({});

  useEffect(() => {
    const fetchImg = async () => {
      try {
        setLoading(true);
        const respImg = await searchImg(search, page);
        const { hits } = respImg.data;
        setItem(prevImages =>
          hits?.length ? [...prevImages, ...hits] : prevImages
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchImg();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setItem([]);
    setPage(1);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const showModal = ({ largeImageURL }) => {
    setModalOpen(true);
    setImgDetails(largeImageURL);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImgDetails({});
  };

  const isItem = Boolean(item.length);
  const isMoreItem = Boolean(item.length % 12 === 0);

  return (
    <div className={styles.box}>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isItem && <ImageGallery items={item} showModal={showModal} />}
      {isItem && isMoreItem && (
        <div className={styles.boxStatist}>
          <Button onClick={loadMore} type="button">
            Load more
          </Button>
        </div>
      )}
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={imgDetails} alt="" />
        </Modal>
      )}
    </div>
  );
};

// class App extends Component {
//   state = {
//     search: '',
//     item: [],
//     loading: false,
//     error: null,
//     page: 1,
//     modalOpen: false,
//     imgDetails: '',
//   };

//   async componentDidUpdate(_, prevState) {
//     const { search, page } = this.state;
//     if (search && (search !== prevState.search || page !== prevState.page)) {
//       this.fetchImg();
//     }
//   }

//   async fetchImg() {
//     const { search, page } = this.state;
//     try {
//       this.setState({
//         loading: true,
//       });
//       const respImg = await searchImg(search, page);
//       const { hits } = respImg.data;
//       this.setState(({ item }) => ({
//         item: hits?.length ? [...item, ...hits] : item,
//       }));
//     } catch (error) {
//       this.setState({
//         error: error.message,
//       });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   handleSearch = ({ search }) => {
//     this.setState({
//       search,
//       item: [],
//       page: 1,
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   showModal = ({ largeImageURL }) => {
//     this.setState({
//       modalOpen: true,
//       imgDetails: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//       imgDetails: '',
//     });
//   };

//   render() {
//     const { handleSearch, loadMore, showModal, closeModal } = this;
//     const { item, loading, error, modalOpen, imgDetails } = this.state;

//     const isItem = Boolean(item.length);
//     const isMoreItem = Boolean(item.length % 12 === 0);

//     return (
//       <div className={styles.box}>
//         <Searchbar onSubmit={handleSearch} />
//         {error && <p className={styles.error}>{error}</p>}
//         {loading && <Loader />}
//         {isItem && <ImageGallery items={item} showModal={showModal} />}
//         {isItem && isMoreItem && (
//           <div className={styles.boxStatist}>
//             <Button onClick={loadMore} type="button">
//               Load more
//             </Button>
//           </div>
//         )}
//         {modalOpen && (
//           <Modal close={closeModal}>
//             <img src={imgDetails} alt="" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

export default App;
