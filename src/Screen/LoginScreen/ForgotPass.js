import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./LoginScreen.css";
import { useSelector } from "react-redux";
import wave from "./wave.png";
import bg from "./bg.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPass({ history }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  }, []);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const histry = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      histry("/");
    }
  }, [histry, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else {
      setLoading(true);
      const res = await fetch("https://volun-backend.onrender.com/api/users/resetpass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === 201) {
        setEmail("");
        setLoading(false);
        setMessage(true);
      } else {
        toast.error("Invalid User", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div style={{ position: "relative", top: "100px" }}>
      <img className="wave" src={wave} alt="wave" />
      <div className="contaner">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={submitHandler} className="fform">
            <h2 className="title">Reset Password</h2>
            {message ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                pasword reset link send Succsfully in Your Email
              </p>
            ) : (
              ""
            )}
            {loading && <Loading />}
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Enter Your Email</h5>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <input type="submit" className="btnn" value="Get Link" />
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPass;
