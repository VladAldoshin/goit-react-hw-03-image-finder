import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputRequest: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputRequest } = this.state;
    if (inputRequest.trim() === '') {
      alert('Please enter your request.');
      return;
    }
    this.props.onSubmit(inputRequest);
    this.setState({ inputRequest: '' });
  };

  render() {
    const { inputRequest } = this.state;
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputRequest"
            value={inputRequest}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

