import React, { useState } from 'react';
import { elecciones_backend } from 'declarations/elecciones_backend';
import LoginForm from './LoginForm';

function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [votante, setVotante] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const resultado = await elecciones_backend.authenticateVoter(id, password);

      if (resultado.ok) {
        setVotante(resultado.ok); // Guarda el votante autenticado
        setError(null); // Limpia el mensaje de error
        console.log('Votante autenticado:', resultado.ok);
      } else {
        setError(resultado.err.UserDoesNotExist); // Muestra el mensaje de error
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setError('Ocurrió un error durante la autenticación.');
    }

    setId(''); // Restablecer el campo de ID
    setPassword(''); // Restablecer el campo de contraseña
  };

  return (
    <div>
      <h2>Autenticar Votante</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Autenticar</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Muestra errores */}
      {votante && <div>Votante autenticado: {votante.nombre}</div>} {/* Muestra el resultado exitoso */}
    </div>
  );
}

export default LoginForm;


