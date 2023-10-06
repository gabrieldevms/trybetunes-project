import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/loading';

export default function Login() {
  const [userName, setUserName] = useState({ name: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const verificaLen = () => ((userName.name.length > 2)
      ? setBtnDisabled(false)
      : setBtnDisabled(true));

    verificaLen();
  }, [userName.name]);

  const navigate = useNavigate();

  const hCadastrar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    const users = await createUser(userName);
    console.log(users);
    setIsLoading(false);
    navigate('/search');
  };

  if (isLoading) return <Loading />;

  return (
    <div className="login">
      <h1>Trybetunes</h1>
      <h2>Login</h2>
      <form action="submit">
        {/* Campo de entrada para o nome de usuário */}
        <label htmlFor="login">
          Nome:
          <input
            type="text"
            data-testid="login-name-input"
            id="login"
            placeholder="Digite seu nome"
            value={ userName.name }
            onChange={ (e) => setUserName({ name: e.target.value }) }
          />
        </label>
        {/* Botão de cadastro */}
        <button
          disabled={ btnDisabled }
          data-testid="login-submit-button"
          onClick={ (e) => hCadastrar(e) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
