import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import ErrorMessage from "./../../components/ErrorMessage";
import Loading from "./../../components/Loading";

const Vregistration = () => {
  const [vName, setVName] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vDescription, setVDescription] = useState("");
  const [vDate, setVDate] = useState("");
  const [vWork, setVWork] = useState("");
  const toast = useToast();
  const [nofill, setNofill] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const history = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!vName || !vDescription || !vDate || !vWork) {
      setNofill("Fill Every Feild");
      return;
    }
    try {
      setNofill();
      const config = {
        headers: {
          "Content-ype": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "https://volun-backend.onrender.com/api/volenteer/registervolun",
        {
          vName,
          vEmail,
          vDescription,
          vDate,
          vWork,
        },
        config
      );
      console.log(data);
      toast({
        title: "Add Event Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history("/vlist");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Container fluid style={{ background: "whitesmoke", height: "88vh" }}>
      <div>
        <Row>
          <Col xs={12} md={3} style={{ padding: "20px" }}></Col>
          <Col xs={12} md={9} style={{ padding: "30px" }}>
            <h5>Registration</h5>
            <div style={{ background: "white", borderRadius: "10px" }}>
              <Form
                style={{
                  padding: "20px",
                  height: "50vh",
                }}
                onSubmit={submitHandler}
              >
                {message && (
                  <ErrorMessage variant="danger">{message}</ErrorMessage>
                )}

                {nofill && <Alert variant="danger">{nofill}</Alert>}
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={vName}
                        onChange={(e) => setVName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={vEmail}
                        onChange={(e) => setVEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Enter Description"
                        value={vDescription}
                        onChange={(e) => setVDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={vDate}
                        placeholder="Enter Time"
                        onChange={(e) => setVDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Type of Work</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter type of Work"
                        value={vWork}
                        onChange={(e) => setVWork(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Vregistration;
