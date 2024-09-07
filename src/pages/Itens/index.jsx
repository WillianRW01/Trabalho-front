import React, { useEffect, useState } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');

  // Função para buscar detalhes de cada item
  const fetchItemDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      name: data.name,
      image: data.sprites.default, // Ícone do item
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
      <h1>Itens Pokémon</h1>

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

      <style jsx>{`
        .item-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .item-card {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }

        img {
          width: 50px;
          height: 50px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default ItemList;
