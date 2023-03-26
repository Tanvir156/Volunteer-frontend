import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
const VregistrationList = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/volenteer/showlist");
      setRows(result.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Container fluid style={{ background: "whitesmoke", height: "88vh" }}>
        <div>
          <Row>
            <Col xs={12} md={2} style={{ padding: "20px" }}>
              <p>
                <Link to="/event">
                  <FaUser />
                  Add Event
                </Link>
              </p>
            </Col>
            <Col xs={12} md={10} style={{ padding: "30px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Email</StyledTableCell>
                      <StyledTableCell align="right">
                        Registration Date
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Volunteer For
                      </StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.vName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.vEmail}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.vDate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.vWork}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <DeleteIcon color="red.500" />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default VregistrationList;
