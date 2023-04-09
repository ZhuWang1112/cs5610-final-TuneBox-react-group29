import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i></button>
          </form>
      </div>
  );
}
export default SearchBar;