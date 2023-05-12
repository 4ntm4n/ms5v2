import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
        <h1 className="text-2xl text-center">whops! looks like you ended up in the wrong place</h1>
        <button onClick={() => navigate(-1)} className="btn btn-ghost">take me back!</button>
    </div>
    );
}

export default Page404;
