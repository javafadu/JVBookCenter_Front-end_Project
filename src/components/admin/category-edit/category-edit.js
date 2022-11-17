import React from "react";
import "./category-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";

import BreadCrumbCategoryEdit from "./breadcrumb-category-edit";
import CategoryEditForm from "./category-edit-form";
import CategoryBooks from "./category-books";

const CategoryEdit = () => {
  return (
    <>
      <div className="admin-category-edit-page">
        <SectionTitle title="Category Edit" />
        <BreadCrumbCategoryEdit />
        <Spacer height={10} />
        <CategoryEditForm />
        <Spacer height={20} />
        <CategoryBooks />
      </div>
    </>
  );
};

export default CategoryEdit;
