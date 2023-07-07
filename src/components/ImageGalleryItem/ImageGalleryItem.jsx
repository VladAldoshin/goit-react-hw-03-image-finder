import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, imageClick }) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={imageClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  imageClick: propTypes.func.isRequired,
};
