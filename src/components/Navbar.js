import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../action/userAction";
import Img from "./../logos/Group 1329.png";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const his = useNavigate();
  const logoutHandeler = () => {
    dispatch(logout());
    his("/account");
  };
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        // position: "fixed",
        // zIndex: "1111111",
        // width: "100%",
        // background: "#3b5998",
        margin: "0",
        border: "0",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={Img}
            width="150"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        {userInfo ? (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {/* <Nav.Link href="/search">People</Nav.Link> */}
                <Nav.Link href="/account" disable>
                  Home
                </Nav.Link>
                <Nav.Link href="/account" disable>
                  Donation
                </Nav.Link>
                <Nav.Link href="/Event" disable>
                  Event
                </Nav.Link>
                <Nav.Link href="/addevent" disable>
                  Blog
                </Nav.Link>
                <Nav.Link href="/vregistration" disable>
                  Be a Volunteer
                </Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandeler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/account" disable>
              Home
            </Nav.Link>
            <Nav.Link href="/account" disable>
              Donation
            </Nav.Link>
            <Nav.Link href="/account" disable>
              Event
            </Nav.Link>
            <Nav.Link href="/account" disable>
              Blog
            </Nav.Link>
            <Nav.Link href="/account" disable>
              Login/Register
            </Nav.Link>
            {/* <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
