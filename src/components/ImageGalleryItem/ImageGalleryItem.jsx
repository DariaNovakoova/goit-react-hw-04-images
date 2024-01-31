import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, showModal }) => (
  <li
    key={id}
    className={styles.imageGalleryItem}
    onClick={() => showModal({ largeImageURL })}
  >
    <img
      className={styles.imageGalleryItemImage}
      src={webformatURL}
      alt=""
      loading="lazy"
    />
  </li>
);

export default ImageGalleryItem;
