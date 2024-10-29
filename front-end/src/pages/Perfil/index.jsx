import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { AuthContext } from '../../auth/Context'
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../../api/user';

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [updNome, setUpdNome] = useState('');
  const [updEmail, setUpdEmail] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  async function carregarPerfil() {
    try {
     
      const response = { id: 1, nome: 'Seu Nome', email: 'seu@email.com' } 

      if (response.id) {
        setId(response.id);
        setNome(response.nome);
        setEmail(response.email);
      }
    } catch (error) {
      alert('Erro inesperado, tente novamente mais tarde!');
    }
  }

  const handleSaveUpdate = async () => {
    try {
      const response = await updateUser(id, { nome: updNome, email: updEmail });

      if (response.id) {
        setNome(updNome);
        setEmail(updEmail);
        setIsUpdate(false);
      }
    } catch (error) {
      alert('Erro inesperado, tente novamente mais tarde!');
    }
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
    setUpdNome(nome);
    setUpdEmail(email);
  };

  const handleClickDelete = async () => {
    try {
      const response = prompt("Para confirmar exclusão digite seu email:");

      if (response === email) {
        const apiResponse = await deleteUser(id);
        if (apiResponse.status === 204) {
          logout();
          navigate('/');
        }
      } else {
        alert("Email inválido, processo cancelado.");
      }
    } catch (error) {
      alert('Erro inesperado, tente novamente mais tarde!');
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

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
