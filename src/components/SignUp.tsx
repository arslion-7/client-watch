import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../configs/firebaseConfig';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signUp()}>Sign up</button>
    </div>
  );
}
