import React from "react";
import { Link } from "react-router-dom";

function Signup() {

  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">You are just one step away</h1>
          <p className="py-6">
            Sign up now and create tasks together with your collegues
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password1"
                placeholder="choose a password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Repeat Password</span>
              </label>
              <input
                type="text"
                name="password2"
                placeholder="Repeat Password"
                className="input input-bordered"
              />
              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  already a member?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
