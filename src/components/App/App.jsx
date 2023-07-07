import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchPixabayImages } from '../Api/Api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import React from 'react';

export class App extends Component {
  state = {
    images: [],
    search: '',
    isLoading: false,
    pageNumber: 1,
    modalIsOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const input = e.target.elements.input;
    if (input.value.trim() === '') {
      return;
    }
    const response = await fetchPixabayImages(input.value, 1);
    this.setState({
      images: response,
      isLoading: false,
      search: input.value,
      pageNumber: 1,
    });
  };

  handleClickMore = async () => {
    const response = await fetchPixabayImages(
      this.state.search,
      this.state.pageNumber + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      pageNumber: this.state.pageNumber + 1,
    });
  };

  handleImageClick = e => {
    this.setState({
      modalIsOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () =>
  this.setState({ modalIsOpen: false, modalImg: '', modalAlt: '' });

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className='App'>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </>
        )}
        {this.state.modalIsOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}
