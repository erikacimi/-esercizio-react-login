import React, { useState, useRef } from 'react';

const App = () => {
  const [users] = useState([
    { email: "erika.ciminelli@gmail.com", name: "Erika", contatore: 1 },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [resetLogin, setResetLogin] = useState(false);

  const emailRef = useRef();

  const handleEmailChange = () => {
    const loginButton = document.querySelector("#loginForm button");
    loginButton.disabled = !emailRef.current.checkValidity();
  };

  const login = () => {
    const enteredEmail = emailRef.current.value.trim().toLowerCase();
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
    emailRef.current.value = '';
    emailRef.current.disabled = false;
    document.querySelector("#loginForm button").disabled = true;

    document.getElementById("welcomeContent").style.display = "none";
    document.getElementById("loginContent").style.display = "block";
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
            ref={emailRef}
            onChange={handleEmailChange}
            required
          />
          <button type="button" onClick={login} disabled={!emailRef.current?.checkValidity()}>Login</button>
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

export default App;
