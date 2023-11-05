

import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from './services/api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!page) {
      return;
    }

    try {
      setIsLoading(true);
      const response = fetchImages(searchData, page);
      response.then(data => {
        console.log(data)
        data.hits.length === 0
          ? toast.error('Nothing found')
          : data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
              !images.some(image => image.id === id) &&
                setImages(i => [...i, { id, webformatURL, largeImageURL }]);
            });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, searchData, images]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(p => p + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500} />
      {images.length >= 12 && <Button nextPage={nextPage} />}
    </div>
  );
}

















//   // state = {
//   //   searchRequest: '',
//   //   images: [],
//   //   galleryPage: 1,
//   //   error: null,
//   //   isLoading: false,
//   //   showModal: null,
//   //   totalHits: null,
//   // };

//   useEffect(() => {
// if(searchRequest === ''){
//   return;
// }

//   })
  

//   // componentDidUpdate(_, prevState) {
//   //   const { searchRequest, galleryPage } = this.state;

//   //   if (prevState.searchRequest !== searchRequest || prevState.galleryPage !== galleryPage) {
//   //     this.fetchImages();
//   //   }
//   // }

//   //  fetchImages = () => {
//   //   const { searchRequest, galleryPage } = this.state;

//   //   this.setState({ isLoading: true, error: null });
//     useEffect(() => {
//     const images = () => {
//       setIsLoading(true);
//       setError(null);

//       fetchImages(searchRequest, galleryPage)
//         .then(data => {
//           if (data.totalHits === 0) {
//             Notiflix.Report.info('Wrong 😪', 'Try again');
//           }
//           setImages(prevState =>
//             galleryPage === 1 ? data.hits : [...prevState, ...data.hits]
//           );
//           setTotalHits(data.totalHits);
//         })
//         .catch(error => setError(error.message))
//         .finally(() => {
//           setIsLoading(false);
//         });
//     };
//     if (!searchRequest) return;
//     images();
//   }, [galleryPage, searchRequest]);

//   const handleSearchSubmit = searchRequest => {
//       setImages([]);
//       setGalleryPage(1);
    

//     setSearchRequest(searchRequest);
//   };

//   const loadMore = () => {
//     setGalleryPage(prevState => prevState + 1)
//   //   this.setState(prevState => ({
//   //     galleryPage: prevState.galleryPage + 1,
//   //   }));
//   //   console.log(this.state.galleryPage)
//   // };
//   }

//   const showModalImage = data => {
//     setShowModal(data)
//   };

//   const closeModalImage = () => {
//     setImages(null)
//   };


//     // const { images, isLoading, error, showModal, totalHits } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={handleSearchSubmit} />
//         {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
//           <ImageGallery images={images} handlePreview={showModalImage} />
//         {isLoading && <Loader color={'#1dbc52'} size={32} />}
//         {totalHits>images.length && (
//         <Button loadMore={loadMore} />
//         )}
//         {showModal && (
//           <Modal
//             lgImage={showModal.largeImageURL}
//             tags={showModal.tags}
//             closeModal={closeModalImage}
//           />
//         )}
//         <ToastContainer autoClose={3000} />
//       </>
//     );
//   }
