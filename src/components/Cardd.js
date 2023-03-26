import React from "react";

import Card from "react-bootstrap/Card";

const Cardd = (props) => {
  return (
    <div style={{}}>
      <Card
        style={{
          borderRadius: "15px",
          width: "200px",

          margin: "auto",
        }}
      >
        <Card.Img variant="top" src={props.Img} fluid />
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title>{props.tittle}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardd;
