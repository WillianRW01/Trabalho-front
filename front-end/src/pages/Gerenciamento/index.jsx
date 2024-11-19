import { useContext, useState } from 'react';
import { createUserAdmin } from '../../api/user';
import { AuthContext } from '../../auth/Context';


export default function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // Para determinar se é admin
  const { role } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Cria o objeto user com os dados coletados
    const user = {
      name,
      email,
      password,
      admin: isAdmin
    };

    try {
      // Chama a função de criação de admin
      const createdUser = await createUserAdmin(user);
      console.log('Admin criado com sucesso:', createdUser);
      alert('Admin criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar admin:', error);
      alert('Erro ao criar admin. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="admin-form">
      <h2>Criar Novo Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="admin">
            <input
              type="checkbox"
              id="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Admin
          </label>
        </div>

        <button type="submit">Criar Admin</button>
      </form>
    </div>
  );
}
