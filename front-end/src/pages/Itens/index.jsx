import React, { useEffect, useState } from 'react';
import './styles.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');

  
  const fetchItemDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return {
      name: data.name,
      image: data.sprites.default, 
    };
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/item?limit=100')
      .then((response) => response.json())
      .then(async (data) => {
        const detailedItems = await Promise.all(
          data.results.map((item) => fetchItemDetails(item.url))
        );
        setItems(detailedItems);
        setFilteredItems(detailedItems);
      })
      .catch((error) => console.error('Erro ao buscar os itens:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <center>
      <h1>Itens Pokémon</h1>

      </center>
      
      <input
        type="text"
        placeholder="Pesquisar item..."
        value={search}
        onChange={handleSearch}
      />

      <div className="item-grid">
        {filteredItems.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
