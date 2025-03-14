import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ToDoList from "./ToDoList"

const ProtectedRoute = () => {
  let nav = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/authCheck`,
    })
      .then((res) => {
        console.warn("PROT ROUTE auth res", res);
        if (res.data.message !== "proceed") {
          nav("/");
        }
      })
      .catch((err) => {
        console.log("useAuth err", err);
      });
  }, [nav]);

  return (
    <>
    {console.log("Protected Route hit ")}
      <ToDoList />
    </>
  );
};

export default ProtectedRoute;