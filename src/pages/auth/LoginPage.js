import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { unAuthRequest } from "../../api/AxiosInterceptors";

function LoginPage() {
  const { user, setUser, setTokens, extractUser } = useAuth();
  const [errors, setErrors] = useState({});

  const login = async (e) => {
    e.preventDefault();

    try {
      setErrors({});
      // fetch a token using the username and password of an existing user
      const response = await unAuthRequest.post("/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      const data = response.data;

      if (response.status === 200) {
        // sets tokens in local Storage
        localStorage.setItem("tokens", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(extractUser(data)));

        setTokens(data);
        setUser(extractUser(data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            non_field_errors: ["Incorrect username or password."],
          }));
        } else if (error.response.data) {
          setErrors(error.response.data);
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-center">
          <h1 className="text-5xl font-bold">We need some verification.</h1>
          <p className="py-6">
            log in with you username and passoword and complete some tasks!
          </p>
          
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={login} className="card-body">
            {errors &&
              errors.non_field_errors?.map((error, index) => (
                <div key={index} className="alert alert-warning shadow-lg">
                  <div>
                    <span className="bg-transparent">{error}.</span>
                  </div>
                </div>
              ))}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                autoComplete="username"
                className="input input-bordered"
              />
              {errors &&
                errors.username?.map((error, index) => (
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className="bg-transparent">{error}.</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                className="input input-bordered"
              />

              {errors &&
                errors.password?.map((error, index) => (
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className="bg-transparent">{error}.</span>
                    </div>
                  </div>
                ))}

              <label className="label">
                <Link to="/signup" className="label-text-alt link link-hover">
                 no account yet?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
