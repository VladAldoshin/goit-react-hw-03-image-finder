import { Component } from 'react';
import { fetchPixabayImages } from '../Api/Api';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    inputRequest: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  componentDidUpdate(_, prevState) {
  const { inputRequest, page } = this.state;
  if (prevState.inputRequest !== inputRequest || prevState.page !== page) {
  this.fetchImages(inputRequest, page);
    }
  }

   fetchImages = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchPixabayImages(query, page);
      const totalPages = Math.ceil(totalHits / this.state.per_page);
      const shouldLoadMore = page < totalPages;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: shouldLoadMore,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  

  formSubmit = inputRequest => {
    this.setState({
      inputRequest,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
   };

 openModal = largeImageURL => {
   this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, loadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
       {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}












