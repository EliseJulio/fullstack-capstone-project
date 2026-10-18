export default function LoginPage() {
  async function handleLogin(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Sign in</h2>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
