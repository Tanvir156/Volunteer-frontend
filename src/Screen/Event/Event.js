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

const Event = () => {
  const [evenName, setEventName] = useState("");
  const [evenDescription, setEvenDescription] = useState("");
  const [evenDate, setEvenDate] = useState("");
  const [Banner, setBanner] = useState("");
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
    if (!evenName || !evenDescription || !evenDate) {
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
        "/api/volenteer",
        {
          evenName,
          evenDescription,
          evenDate,
          Banner,
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
      history("/");
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

  const postDetails = (pics) => {
    setLoading(true);
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notebook");
      data.append("cloud_name", "di9t7qtyt");
      data.append("api_key", "398755883287761");
      data.append("api_secret", "2UNvhIpwPLwZ9jSsYMvKAYQDbjA");
      fetch("https://api.cloudinary.com/v1_1/di9t7qtyt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setBanner(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <Container fluid style={{ background: "whitesmoke", height: "88vh" }}>
      <div>
        <Row>
          <Col xs={12} md={3} style={{ padding: "20px" }}>
            <p>
              <Link to="/vlist">
                <FaUser />
                Volunteer Register List
              </Link>
            </p>
          </Col>
          <Col xs={12} md={9} style={{ padding: "30px" }}>
            <h5>Add Event</h5>
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
                      <Form.Label>Event Tittle</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter tittle"
                        value={evenName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Enter tittle"
                        value={evenDescription}
                        onChange={(e) => setEvenDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={evenDate}
                        placeholder="Enter email"
                        onChange={(e) => setEvenDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Banner</Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="Enter tittle"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => postDetails(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {loading ? (
                  <Loading />
                ) : (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Event;
