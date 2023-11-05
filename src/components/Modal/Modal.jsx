import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ toggleModal, largeImage }) {
  useEffect(() => {
    const handleKeyDown = event => event.code === 'Escape' && toggleModal();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleBackdropClick = event => {
    event.target === event.currentTarget && toggleModal();
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};