import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import fetchImages  from './services/api';
import Notiflix from 'notiflix';

export const App =() => {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  // state = {
  //   searchRequest: '',
  //   images: [],
  //   galleryPage: 1,
  //   error: null,
  //   isLoading: false,
  //   showModal: null,
  //   totalHits: null,
  // };

  useEffect(() => {
if(searchRequest === ''){
  return;
}

  })
  

  // componentDidUpdate(_, prevState) {
  //   const { searchRequest, galleryPage } = this.state;

  //   if (prevState.searchRequest !== searchRequest || prevState.galleryPage !== galleryPage) {
  //     this.fetchImages();
  //   }
  // }

  //  fetchImages = () => {
  //   const { searchRequest, galleryPage } = this.state;

  //   this.setState({ isLoading: true, error: null });
    useEffect(() => {
    const getImages = () => {
      setIsLoading(true);
      setError(null);

      fetchImages(searchRequest, galleryPage)
        .then(data => {
          if (data.totalHits === 0) {
            Notiflix.Report.info('Wrong 😪', 'Try again');
          }
          setImages(prevState =>
            galleryPage === 1 ? data.hits : [...prevState, ...data.hits]
          );
          setTotalHits(data.totalHits);
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setIsLoading(false);
        });
    };
    if (!searchRequest) return;
    getImages();
  }, [galleryPage, searchRequest]);

  const handleSearchSubmit = searchRequest => {
      setImages([]);
      setGalleryPage(1);
    

    setSearchRequest(searchRequest);
  };

  const loadMore = () => {
    setGalleryPage(prevState => prevState + 1)
  //   this.setState(prevState => ({
  //     galleryPage: prevState.galleryPage + 1,
  //   }));
  //   console.log(this.state.galleryPage)
  // };
  }

  const showModalImage = data => {
    setShowModal(data)
  };

  const closeModalImage = () => {
    setImages(null)
  };


    // const { images, isLoading, error, showModal, totalHits } = this.state;
    return (
      <>
        <Searchbar onSearch={handleSearchSubmit} />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
          <ImageGallery images={images} handlePreview={showModalImage} />
        {isLoading && <Loader color={'#1dbc52'} size={32} />}
        {totalHits>images.length && (
        <Button loadMore={loadMore} />
        )}
        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={closeModalImage}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
