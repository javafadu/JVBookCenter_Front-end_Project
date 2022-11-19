import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import BreadCrumb from "./breadcrumb";
import "./users.scss";
import UserList from "./user-list";
import UserSearchBar from "./user-searchbar";

const Users = () => {
  return (
    <>
      <div className="admin-authors-page">
        <SectionTitle title="Users" />
        <BreadCrumb />
        <Spacer height={10} />
        <UserSearchBar />
        <Spacer height={10} />
        <UserList />
      </div>
    </>
  );
};

export default Users;
