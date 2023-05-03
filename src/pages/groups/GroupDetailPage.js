import React from "react";
import { useParams } from "react-router-dom";

function GroupDetailPage() {
    const {id} = useParams();
  return (
    <h1>this is group {id} </h1>
  );
}

export default GroupDetailPage;
