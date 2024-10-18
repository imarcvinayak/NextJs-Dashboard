import { useState } from "react";
import { userList } from "../utils/UserList";
import "./style.css";

function LoginForm({ setIsLogin, setUser, initialtheme }) {
  const users = userList();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmailId(value);
    if (name === "password") setPassword(value);
  };
  function handleSubmit(e) {
    e.preventDefault();

    const user = users.find((user) => user.username === emailId);
    setUser({
      ...user,
      themePalette: [initialtheme],
    });
    if (user) {
      localStorage.setItem("LOGGED_IN", JSON.stringify(user));
      setIsLogin(true);
    }
  }
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={emailId}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <button type="submit" className="login-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
