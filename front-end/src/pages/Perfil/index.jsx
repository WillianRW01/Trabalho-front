import { useState } from 'react';
import './styles.css';

export default function Profile({ nome, email, handleClickDelete }) {
  const [isUpdate, setIsUpdate] = useState(false); // controle de edição
  const [updNome, setUpdNome] = useState(nome);    // nome atualizado
  const [updEmail, setUpdEmail] = useState(email); // email atualizado

  const handleClickUpdate = () => {
    setIsUpdate(true); // ativa o modo de edição
  };

  const handleSaveUpdate = () => {
    // Aqui você pode adicionar uma lógica para salvar os dados atualizados
    setIsUpdate(false); // sai do modo de edição
  };

  return (
    <div className='profile'>
      <div className='info'>
        <h1>Dados do seu perfil</h1>
        <p>Nome: {!isUpdate ? nome : <input type='text' id="nome" value={updNome} onChange={(e) => setUpdNome(e.target.value)} />} </p>
        <p>Email: {!isUpdate ? email : <input type='email' id="email" value={updEmail} onChange={(e) => setUpdEmail(e.target.value)} />} </p>
        {
          !isUpdate ? 
            <div className='actions'>
              <button onClick={handleClickDelete}>Excluir Conta</button>
              <button className='primary' onClick={handleClickUpdate}>Alterar Dados</button>
            </div>
          : <div className='actions'>
              <button onClick={() => setIsUpdate(false)}>Cancelar</button>
              <button className='primary' onClick={handleSaveUpdate}>Salvar</button>
            </div>
        }
      </div>
    </div>
  );
}
