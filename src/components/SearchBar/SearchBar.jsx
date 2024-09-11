import React from 'react';
import './SearchBar.css';

const SearchBar = ({ search, handleSearch }) => (
  <input
    type="text"
    placeholder="Pesquisar Pokémon..."
    value={search}
    onChange={handleSearch}
  />
);

export default SearchBar;
