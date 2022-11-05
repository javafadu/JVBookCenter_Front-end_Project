import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {
  RiUser3Line,
  RiCarLine,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { logout } from "../../../../store/slices/auth-slice";
import { question } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";

const UserSideBar = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        secureLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <Navbar bg="light" expand="lg" className="user-sidebar" variant="dark">
      <Container>
        <FaUserCircle size="120" />
        <h4>{`${user.firstName} ${user.lastName}`}</h4>
        <p>{user.email}</p>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user/my-profile">
              <RiDashboardLine /> User Information
            </Nav.Link>
            <Nav.Link as={Link} to="/user/my-account">
              <RiUser3Line /> Account Information
            </Nav.Link>
            <Nav.Link as={Link} to="/user/my-books">
              <RiCarLine /> My Books
            </Nav.Link>

            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserSideBar;
