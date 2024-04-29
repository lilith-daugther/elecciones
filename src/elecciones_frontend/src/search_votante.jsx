import React, { useState } from 'react';
import { elecciones_backend } from 'declarations/elecciones_backend';

function VoterSearch() {
  const [voterId, setVoterId] = useState('');
  const [voter, setVoter] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const result = await elecciones_backend.readUserById(voterId);

      if (result.isSome()) {
        setVoter(result.unwrap());
        setError(null);
      } else {
        setVoter(null);
        setError(`No se encontró el votante con ID: ${voterId}`);
      }
    } catch (e) {
      setError(`Error al buscar el votante: ${e.message}`);
    }

    setVoterId(''); // Limpia el campo de búsqueda
  };

  return (
    <div>
      <h2>Buscar Votante por ID</h2>
      <form onSubmit={handleSearch}>
        <label>ID del Votante:</label>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {voter && (
        <div>
          <h3>Votante Encontrado:</h3>
          <p>Nombre: {voter.nombre}</p>
          <p>Primer Apellido: {voter.primerApellido}</p>
          <p>Segundo Apellido: {voter.segundoApellido}</p>
          <p>ID: {voter.id.toText()}</p>
        </div>
      )}
    </div>
  );
}

export default VoterSearch;
