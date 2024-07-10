import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function NavigationBar() {
  const navigate = useNavigate();
  const total = useSelector((state) => state.totalCart);

  return (

    // <Navbar bg="primary" data-bs-theme="dark">
    //     <Container>
    //       <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#features">Features</Nav.Link>
    //         <Nav.Link href="#pricing">Pricing</Nav.Link>
    //       </Nav>
    //     </Container>
    //   </Navbar>


    <Navbar bg="primary"  data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/addproducts">
              <Nav.Link>Add a product</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="d-flex align-items-center">
            <AiOutlineShoppingCart size={30} onClick={() => navigate("/cart")} style={{ cursor: "pointer",  color: "#ffffff" }} />
            {total > 0 && (
              <div onClick={() => navigate("/cart")}  
                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  cursor: "pointer",
                  color: "red",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginLeft: '-1rem',
                  zIndex: 1,
                }}
              >
                {total}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
