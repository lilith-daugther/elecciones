import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/elecciones_backend'; 
import { Principal } from '@dfinity/principal';

const agent = new HttpAgent({ host: 'http://localhost:3000/' }); 
const eleccionesBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId: 'YOUR_CANISTER_ID', 
});

export { eleccionesBackend };
