import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginScreen.css";
import { ToastContainer, toast } from "react-toastify";
import wave from "./wave.png";
import bg from "./bg.svg";
import avatar from "./avatar.svg";
function LoginScreen() {
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

  const [password, setPassword] = useState("");
  const { id, token } = useParams();

  const history = useNavigate();
  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(`https://volun-backend.onrender.com/api/users/resetpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status === 201) {
      console.log("user valid");
    } else {
      history("/forgotpass");
      console.log("user not valid");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`https://volun-backend.onrender.com/api/users/changepass/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status === 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div style={{ position: "relative", top: "100px" }}>
      <img className="wave" src={wave} alt="wave" />
      <div className="contaner">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={submitHandler} className="fform">
            <img src={avatar} alt="avatar" />
            <ToastContainer />
            <h2 className="title">Change Password</h2>
            {message ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Password Succesfully Update{" "}
              </p>
            ) : (
              ""
            )}

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Enter New Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <input type="submit" className="btnn" value="Reset" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
