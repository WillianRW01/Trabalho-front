// components/CreatePokemonModal/CreatePokemonModal.jsx
import React, { useState } from 'react';

const CreatePokemonModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [abilities, setAbilities] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      height: parseFloat(height),
      weight: parseFloat(weight),
      abilities: abilities.split(',').map((ability) => ability.trim()),
      image: 'https://via.placeholder.com/150', // Imagem genérica ou personalizada
      types: 'custom' // Tipo customizado para separar dos pokémons da API
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Criar Novo Pokémon</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label>Altura: <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required /></label>
          <label>Peso: <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required /></label>
          <label>Habilidades: <input type="text" value={abilities} onChange={(e) => setAbilities(e.target.value)} placeholder="Habilidade1, Habilidade2" required /></label>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePokemonModal;
