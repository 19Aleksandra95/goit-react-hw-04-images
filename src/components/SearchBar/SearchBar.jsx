import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import css from './SearchBar.module.css';



const Searchbar = ({onSubmit}) => {
  const [searchRequest, setSearchRequest] = useState('');

  const handleRequestChange = ({searchRequest}) => {
    setSearchRequest(searchRequest);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(searchRequest)
    setSearchRequest('');
  };

  return (
          <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
              <button type="submit" className={css.SearchForm_button}>
                <span className={css.SearchForm_button_label}>Search</span>
              </button>
    
              <input
                className={css.SearchForm_input}
                type="text"
                name="searchRequest"
                value={searchRequest}
                onChange={handleRequestChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        );
};

export default Searchbar;

// export default class Searchbar extends Component {
//   static defaultProps = {
//     onSearch: PropTypes.func.isRequired,
//   };

//   state = {
//     searchRequest: '',
//   };

//   handleRequestChange = event => {
//     this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchRequest.trim() === '') {
//       return toast.warning('Search field is empty!');
//     }
//     this.props.onSearch(this.state.searchRequest);
//     this.setState({ searchRequest: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchForm_button}>
//             <span className={css.SearchForm_button_label}>Search</span>
//           </button>

//           <input
//             className={css.SearchForm_input}
//             type="text"
//             name="searchRequest"
//             value={this.state.searchRequest}
//             onChange={this.handleRequestChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }