import { Canister,
    Err,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec } from 'azle';

// Definir el tipo de usuario votante
const Voter = Record ({
    id: Principal, 
    nombre : text,
    primerApellido : text,
    segundoApellido : text,
    password : text
});
type Voter = typeof Voter.tsType;

//Si el usuario no existe
const AplicationError = Variant ({
    UserDoesNotExiste: text
});
type AplicationError = typeof AplicationError.tsType;

// Lista para almacenar votantes registrados
let users = StableBTreeMap<Principal, Voter>(0);

//Generar id para los votantes
function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

export default Canister({
    createUser: update([text, text, text, text], Voter, (nombre, primerApellido, segundoApellido, password) => {
        const id = generateId();
        const user: Voter = {
            id: id,
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            password: password
        };

        users.insert(user.id, user);

        return user;
    }),
    readUsers: query([], Vec(Voter), () => {
        return users.values();
    }),
    readUserById: query([text], Opt(Voter), (id) => {
        return users.get(Principal.fromText(id));
    }),
    authenticateVoter: query([text, text], Result(Voter, AplicationError), (id, password) => {
        const userOpt = users.get(Principal.fromText(id));

        if (userOpt.isNone()) {
            return Err({
                UserDoesNotExist: `El usuario con ID ${id} no existe.`
            });
        }

        const user = userOpt.unwrap();
        if (user.password !== password) {
            return Err({
                UserDoesNotExist: `Contraseña incorrecta para el usuario con ID ${id}.`
            });
        }

        // Autenticación exitosa
        return Ok(user);
    }),
});


////////////////////////////////////////////////////////////////////////////////////