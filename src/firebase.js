import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const firebaseConfig = {
  // TODO: your firebase config here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function login() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function onUserChanged(callback) {
  onAuthStateChanged(auth, callback);
}
