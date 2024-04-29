import React, { useState } from 'react';
import { elecciones_backend } from 'declarations/elecciones_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [password, setPassword] = useState('');

  const [authId, setAuthId] = useState(''); // Estado para el ID del formulario de autenticación
  const [authPassword, setAuthPassword] = useState(''); // Estado para la contraseña del formulario de autenticación
  const [authError, setAuthError] = useState(null); // Estado para manejar errores
  const [authenticatedVoter, setAuthenticatedVoter] = useState(null); // Estado para guardar el votante autenticado
  
  function handleGreet(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    elecciones_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
  }

  async function handleRegister(event) {
    event.preventDefault();

    const nuevoVotante = await elecciones_backend.createUser(
      nombre,
      primerApellido,
      segundoApellido,
      password
    );

    console.log('Nuevo votante creado:', nuevoVotante);

    setNombre('');
    setPrimerApellido('');
    setSegundoApellido('');
    setPassword('');
  }

  async function handleAuthenticate(event) {
    event.preventDefault();
    try {
      const resultado = await elecciones_backend.authenticateVoter(authId, authPassword);

      if (resultado.ok) {
        setAuthenticatedVoter(resultado.ok); // Guardar el votante autenticado
        setAuthError(null); // Limpiar cualquier error anterior
      } else {
        setAuthError(resultado.err.UserDoesNotExist); // Guardar el mensaje de error
      }
    } catch (error) {
      setAuthError('Error al autenticar'); // Capturar errores inesperados
    }

    setAuthId(''); // Restablecer el campo de ID
    setAuthPassword(''); // Restablecer el campo de contraseña
  }

  return (
    <main>
      {/* Formulario para saludar */}
      <form onSubmit={handleGreet}>
        <label htmlFor="name">Ingresa tu nombre: &nbsp;</label>
        <input id="name" type="text" />
        <button type="submit">¡Salúdame!</button>
      </form>
      <section id="greeting">{greeting}</section>

      <br />

      {/* Formulario para registrar un nuevo votante */}
      <h2>Registrar un nuevo votante</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Primer Apellido:</label>
          <input
            type="text"
            value={primerApellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
          />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input
            type="text"
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>

      <br />

      {/* Formulario para autenticar un votante */}
      <h2>Autenticar un votante</h2>
      <form onSubmit={handleAuthenticate}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={authId}
            onChange={(e) => setAuthId(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
          />
        </div>
        <button type="submit">Autenticar</button>
      </form>

      {/* Mostrar mensajes de error */}
      {authError && <div style={{ color: 'red' }}>{authError}</div>}

      {/* Mostrar detalles del votante autenticado */}
      {authenticatedVoter && (
        <div>
          <h3>Votante autenticado:</h3>
          <p>Nombre: {authenticatedVoter.nombre}</p>
          <p>ID: {authenticatedVoter.id.toText()}</p>
        </div>
      )}
    </main>
  );
}

export default App;

