import propTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onloadMore}) => (
  <div className={css.ButtonContainer}>
    <button className={css.Button} type="button" onClick={onloadMore}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};







