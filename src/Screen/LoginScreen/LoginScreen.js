import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./LoginScreen.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../action/userAction";
import wave from "./wave.png";
import bg from "./bg.svg";
import avatar from "./avatar.svg";
function LoginScreen({ history }) {
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
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const histry = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      histry("/");
    }
  }, [histry, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div style={{ position: "relative", top: "100px" }}>
      {loading && <Loading />}
      <img className="wave" src={wave} alt="wave" />
      <div className="contaner">
        <div className="img">
          <img src={bg} alt="bg" />
        </div>
        <div className="login-content">
          <form onSubmit={submitHandler} className="fform">
            <img src={avatar} alt="avatar" />
            <h2 className="title">Welcome</h2>
            {error && <ErrorMessage variant="danger">Failed</ErrorMessage>}
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <input type="submit" className="btnn" value="Login" />
            <Row className="py-3" style={{ display: "grid", margin: "auto" }}>
              <Col>
                Haven't any Account ? <Link to="/register">Register</Link>
              </Col>
              <Col>
                <Link to="/forgotpass"> Forget Password </Link>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
