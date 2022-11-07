import React from "react";
import "./admin-sidebar.scss";
import { question } from "../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import adminIcon from "../../../assets/img/find_user.png";
import { AiFillDashboard, AiFillPieChart } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiAffinitypublisher } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import { FaUsersCog, FaGlobe } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AdminSidebar = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
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
    <>
      <Navbar bg="light" expand="lg" className="user-sidebar" variant="dark">
        <Container>
          <div className="title-icon">
            <img src={adminIcon} alt="" className="img-fluid" />
          </div>
          <div className="title-text">
            <h4>{`${user.firstName} ${user.lastName}`}</h4>
            <p>{user.roles}</p>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink as={Link} to="/admin" activeStyle>
                <AiFillDashboard /> Dashboard
              </NavLink>
              <NavLink as={Link} to="/admin/books" activeStyle>
                <ImBooks /> Books
              </NavLink>
              <NavLink as={Link} to="/admin/authors" activeStyle>
                <BsFillPersonLinesFill /> Authors
              </NavLink>
              <NavLink as={Link} to="/admin/publishers" activeStyle>
                <SiAffinitypublisher /> Publishers
              </NavLink>
              <NavLink as={Link} to="/admin/categories" activeStyle>
                <MdCategory /> Categories
              </NavLink>
              <NavLink as={Link} to="/admin/users" activeStyle>
                <FaUsersCog /> Users
              </NavLink>
              <NavLink as={Link} to="/admin/reports" activeStyle>
                <AiFillPieChart /> Report
              </NavLink>
              <NavLink as={Link} to="/" activeStyle>
                <FaGlobe /> Website
              </NavLink>

              <Nav.Link onClick={handleLogout} activeStyle>
                <RiLogoutCircleRLine /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminSidebar;
