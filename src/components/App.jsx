import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getAllImagesApi } from '../api/imageGallery';

const App = () => {
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const data = await getAllImagesApi(query, currentPage);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setHasMoreImages(data.hits.length === 12);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, currentPage]);

  const handleImageClick = imageUrl => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    if (!hasMoreImages) return;

    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = query => {
    setQuery(query);
    setImages([]);
    setCurrentPage(1);
    setHasMoreImages(false);
  };

  const shouldLoadMore = images.length >= 12 && hasMoreImages;

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {shouldLoadMore && <Button onClick={handleLoadMore} query={query} />}
      {isModalOpen && (
        <Modal
          imageUrl={modalImageUrl}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
