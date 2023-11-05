import { useEffect } from 'react';

import css from './Modal.module.css';

const Modal = ({ imgSrc, alt, onClose }) => {
	const closeModal = ( {target, currentTarget} ) => {
    if (target === currentTarget) onClose();
  };


  useEffect(() => {
		const handleBackdropClick = ({ code }) => {
      if (code === 'Escape') onClose();
    };
		window.addEventListener('keydown', handleBackdropClick);
		
		return () => {
      window.removeEventListener('keydown', handleBackdropClick);
    };	
	}, [onClose])


  const handleBackdropClick = element => {
    if (element.code === 'Escape') {
      closeModal();
    }
  };

  // const handleBackdropClick = event => {
  //   if (event.currentTarget === event.target) {
  //     closeModal();
  //   }
  // };


    const { lgImage, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>
          <img src={lgImage} alt={tags} />
        </div>
      </div>
    );
  }

  export default Modal;