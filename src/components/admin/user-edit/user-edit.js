import React from "react";
import "./user-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import BreadCrumbUserEdit from "./breadcrumb-user-edit";
import Spacer from "../../general/spacer/spacer";
import UserEditForm from "./user-edit-form";
import LoaningHistory from "./loaning-history";


const UserEdit = () => {
  return (
    <>
      <div className="admin-user-edit-page">
        <SectionTitle title="User Edit" />
        <BreadCrumbUserEdit />
        <Spacer height={10} />
        <UserEditForm />
        <Spacer height={10} />
       
        <LoaningHistory />
      </div>
    </>
  );
};

export default UserEdit;
