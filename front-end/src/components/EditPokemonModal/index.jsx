import React, { useState, useEffect } from 'react';
import './styles.css';

const EditPokemonModal = ({ isOpen, onClose, pokemon, onEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    typeArray: [],
    // Adicione outros campos necessários, como habilidades, imagem, etc.
  });

  useEffect(() => {
    if (pokemon) {
      setFormData({
        name: pokemon.name,
        typeArray: pokemon.typeArray || [],
        // Preencha outros campos necessários
      });
    }
  }, [pokemon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData); // Chama a função de edição passando os dados do formulário
    onClose(); // Fecha o modal após a edição
  };

  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Pokémon</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tipo:
            <input
              type="text"
              name="typeArray"
              value={formData.typeArray.join(', ')} // Para mostrar tipos como texto
              onChange={handleChange}
              required
            />
          </label>
          {/* Adicione outros campos conforme necessário */}
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditPokemonModal;
