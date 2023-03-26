import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cardd from "./../../components/Cardd";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import axios from "axios";
const FrontPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/volenteer/show");
      setDetails(result.data);
    };

    fetchData();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDetails, setFilteredDetails] = useState(details);

  const filterDetails = () => {
    const filtered = details.filter((detail) =>
      detail.evenName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDetails(filtered);
  };

  return (
    <div style={{ background: "whitesmoke" }}>
      <h1 style={{ textAlign: "center", padding: "20px" }}>
        I Grow By Helping People In Need
      </h1>
      <Form
        className="d-flex"
        style={{ padding: "20px", width: "400px", margin: "auto" }}
      >
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>
      <div style={{ margin: "2%" }}>
        {filteredDetails.length > 0 ? (
          <div style={{ margin: "2%" }}>
            <Row xs={1} sm={2} md={3} lg={5}>
              {filteredDetails.map((detail) => (
                <Col style={{ marginBottom: "20px" }}>
                  <Cardd Img={detail.Banner} tittle={detail.evenName} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div style={{ margin: "2%" }}>
            <Row xs={1} sm={2} md={3} lg={5}>
              {details &&
                details
                  .filter((detail) =>
                    detail.evenName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((detail) => (
                    <Col style={{ marginBottom: "20px" }}>
                      <Cardd Img={detail.Banner} tittle={detail.evenName} />
                    </Col>
                  ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontPage;
