import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { unAuthRequest } from "../../api/AxiosInterceptors";

function Signup() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      password1: e.target.password1.value,
      password2: e.target.password2.value,
    };

    try {
      setErrors({});
      await unAuthRequest.post("/dj-rest-auth/registration/", newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.data) {
        setErrors(error.response.data);
      }
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-justify max-w-xl">
          <h1 className="text-5xl font-bold ">Welcome to GroupTask!</h1>
          <p className="py-6">
            In culmination of my advanced front-end development course, I
            present GroupTask. An app designed to encourage collaboration and
            enhance productivity. Users can establish groups, bring members on
            board, and create tasks.
          
            <p/>

            <p>Unlike traditional task delegation, GroupTask empowers group members
            to take ownership of tasks which start off as open to anyone within
            the group.</p>

            As tasks are completed, they can be removed or reopened for further
            refinement. This project represents my first steps into building
            practical and effective software solutions. Sign up and log in now to explore my
            approach to effective task management in a group setting.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="choose a username"
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
                name="password1"
                placeholder="choose a password"
                className="input input-bordered"
              />
              {errors &&
                errors.password1?.map((error, index) => (
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className="bg-transparent">{error}.</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Repeat Password</span>
              </label>
              <input
                type="password"
                name="password2"
                placeholder="Repeat Password"
                className="input input-bordered"
              />
              {errors &&
                errors.password2?.map((error, index) => (
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className="bg-transparent">{error}.</span>
                    </div>
                  </div>
                ))}
              {errors &&
                errors.non_field_errors?.map((error, index) => (
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className="bg-transparent">{error}.</span>
                    </div>
                  </div>
                ))}
              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  already a member?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
