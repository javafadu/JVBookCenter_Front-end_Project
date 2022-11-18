import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import UserAddForm from "./user-add-form";
import BreadCrumbUserAdd from "./breadcrumb-user-add";

const UserAdd = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Add User" />
        <BreadCrumbUserAdd />
        <Spacer height={10} />
        <UserAddForm />
        <Spacer height={10} />
      </div>
    </>
  );
};

export default UserAdd;
