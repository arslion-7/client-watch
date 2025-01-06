import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../configs/firebaseConfig';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
