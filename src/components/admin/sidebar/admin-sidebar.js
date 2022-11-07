import React from "react";
import "./admin-sidebar.scss";
import { question } from "../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

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
    <div id="wrapper">
      <nav className="navbar navbar-default navbar-cls-top " role="navigation">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">
            Binary admin
          </a>
        </div>
      </nav>

      <nav className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">
            <li className="text-center">
              <img
                src={require(`../../../assets/img/find_user.png`)}
                className="user-image img-responsive"
                alt=""
              />
            </li>

            <li>
              <a className="active-menu" href="index.html">
                <i className="fa fa-dashboard fa-3x"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="ui.html">
                <i className="fa fa-desktop fa-3x"></i> UI Elements
              </a>
            </li>
            <li>
              <a href="tab-panel.html">
                <i className="fa fa-qrcode fa-3x"></i> Tabs & Panels
              </a>
            </li>
            <li>
              <a href="chart.html">
                <i className="fa fa-bar-chart-o fa-3x"></i> Morris Charts
              </a>
            </li>
            <li>
              <a href="table.html">
                <i className="fa fa-table fa-3x"></i> Table Examples
              </a>
            </li>
            <li>
              <a href="form.html">
                <i className="fa fa-edit fa-3x"></i> Forms{" "}
              </a>
            </li>

            <li>
              <a href="blank.html">
                <i className="fa fa-square-o fa-3x"></i> Blank Page
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
