import './styles.css'

export default function Profile({ nome, email, isUpdate, handleClickDelete, handleClickUpdate, handleSaveUpdate, setIsUpdate, updNome, setUpdNome, updEmail, setUpdEmail }) {
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
  )
}
