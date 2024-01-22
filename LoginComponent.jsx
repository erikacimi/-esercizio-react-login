import React, { useState } from 'react';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [resetLogin, setResetLogin] = useState(false);

  const users = [
    { email: "erika.ciminelli@gmail.com", name: "Erika", contatore: 1 },
  ];

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const login = () => {
    const enteredEmail = email.trim().toLowerCase();
    const foundUser = users.find((user) => user.email === enteredEmail);

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoggedIn(true);
      setResetLogin(false);
    } else {
      alert("Invalid email. Please enter a valid email address.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);

    if (resetLogin) {
      resetLoginForm();
      setResetLogin(false);
    } else {
      setResetLogin(true);
      resetLoginForm();
    }
  };

  const resetLoginForm = () => {
    setEmail('');
    document.getElementById("email").disabled = false;
    document.querySelector("#loginForm button").disabled = true;
  };

  return (
    <div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Login Page</h1>
        <form id="loginForm" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="button" onClick={login} disabled={!email}>Login</button>
        </form>
      </div>

      {isLoggedIn ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 id="welcomeMessage">
            {currentUser.contatore > 1
              ? `Welcome back ${currentUser.name}`
              : `Welcome ${currentUser.name}`}
          </h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : null}
    </div>
  );
};

export default LoginComponent;
