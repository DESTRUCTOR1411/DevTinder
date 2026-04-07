import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">

        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12V22H4V12" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 7H2v5h20V7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isLoginForm ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-base-content/60 text-sm mt-1">
            {isLoginForm
              ? "Sign in to your account to continue"
              : "Join us today — it's completely free"}
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body gap-0 p-8">

            {/* Sign Up Only Fields */}
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-medium uppercase tracking-wide text-base-content/50">
                      First name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    value={firstName}
                    className="input input-bordered input-sm h-10 w-full text-sm"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text text-xs font-medium uppercase tracking-wide text-base-content/50">
                      Last name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    className="input input-bordered input-sm h-10 w-full text-sm"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-control mb-2">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium uppercase tracking-wide text-base-content/50">
                  Email address
                </span>
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={emailId}
                className="input input-bordered input-sm h-10 w-full text-sm"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-control mb-4">
              <label className="label pb-1">
                <span className="label-text text-xs font-medium uppercase tracking-wide text-base-content/50">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                className="input input-bordered input-sm h-10 w-full text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-error text-xs text-center mb-3 bg-error/10 py-2 px-3 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              className="btn btn-primary btn-sm h-10 w-full text-sm font-medium"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Sign in" : "Create account"}
            </button>

            {/* Divider */}
            <div className="divider text-xs text-base-content/40 my-5">or</div>

            {/* Toggle */}
            <p className="text-center text-sm text-base-content/60">
              {isLoginForm ? "Don't have an account? " : "Already have an account? "}
              <span
                className="text-primary font-medium cursor-pointer hover:underline"
                onClick={() => {
                  setIsLoginForm((v) => !v);
                  setError("");
                }}
              >
                {isLoginForm ? "Create one" : "Sign in"}
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;