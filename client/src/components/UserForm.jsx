import { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();
    if (res.ok) {
      alert('User added!');
      setName('');
      setEmail('');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={addUser}>
      <input
        type="text"
        placeholder="User name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;