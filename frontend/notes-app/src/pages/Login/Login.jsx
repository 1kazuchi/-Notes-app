import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/Helper";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    
    setError("")
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border bg-white rounded px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="flex items-center justify-center text-2xl mb-7 ">
              Login
            </h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1 ">{error}</p>}

            <button type="submit" className="btn-primary">
              login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;