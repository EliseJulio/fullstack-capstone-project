export default function RegisterPage() {
  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create account</h2>
      <input name="name" placeholder="Full name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
