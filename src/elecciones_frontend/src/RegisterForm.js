import React, { useState } from 'react';
import { eleccionesBackend } from './api'; 

function RegisterForm() {
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoVotante = await eleccionesBackend.createUser(
      nombre,
      primerApellido,
      segundoApellido,
      password
    );

    console.log('Nuevo votante creado:', nuevoVotante);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegisterForm;
