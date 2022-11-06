import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import {
  RiUser3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { logout } from "../../../../store/slices/auth-slice";
import { question } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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

  const isActive = {
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <Navbar bg="light" expand="lg" className="user-sidebar" variant="dark">
      <Container>
        <div className="title-icon">
          <BsFillPeopleFill />
        </div>
        <div className="title-text">
          <h4>{`${user.firstName} ${user.lastName}`}</h4>
          <p>{user.email}</p>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to="/user/my-profile" activeStyle={isActive}>
              <RiDashboardLine /> User Information
            </NavLink>
            <NavLink as={Link} to="/user/my-account" activeStyle={isActive}>
              <RiUser3Line /> Account Information
            </NavLink>
            <NavLink as={Link} to="/user/my-books" activeStyle={isActive}>
              <TbBooks /> My Books
            </NavLink>

            <Nav.Link onClick={handleLogout} activeStyle={isActive}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserSideBar;
