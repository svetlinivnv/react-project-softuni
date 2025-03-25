import "./styles.css";

export default function Register() {
  const submitAction = (formData) => {
    const registerData = Object.fromEntries(formData);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form action={submitAction}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
