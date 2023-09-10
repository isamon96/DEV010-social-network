import { signInWithPopup } from 'firebase/auth';
import { sigInWithGoogle } from '../src/lib/index.js'; // Importa la función
// import { auth } from "../src/firebase.js"; // Importa la instancia de Firebase auth
// Mock de firebase auth
jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  getAuth: jest.fn(() => ({ currentUser: { } })),
  GoogleAuthProvider: jest.fn(),
}));

// Crea un objeto de evento simulado
// Llama a la función y espera que resuelva correctamente
// Verifica que signInWithPopup se haya llamado con los argumentos correctos
// Verifica que el evento preventDefault se haya llamado
// Verifica que se haya impreso el usuario
// Configura los mocks para simular un error
// Crea un objeto de evento simulado
// Llama a la función y espera que maneje el error correctamente
// Verifica que signInWithPopup se haya llamado con los argumentos correctos
// Verifica que el evento preventDefault se haya llamado
// Verifica que se haya impreso el error

describe('debe llamar a SigInWithGoogle', () => {
  it('debe llamar SigInWithPopUp', async () => {
    console.log(signInWithPopup);
    const event = { preventDefault: jest.fn() };
    await sigInWithGoogle(event);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});
