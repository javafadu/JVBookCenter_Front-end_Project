import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import CategoryAddForm from "./category-add-form";
import BreadCrumbCategoryAdd from "./breadcrumb-category-add";

const CategoryAdd = () => {
  return (
    <>
      <div className="admin-category-edit-page">
        <SectionTitle title="Add Category" />
        <BreadCrumbCategoryAdd />
        <Spacer height={10} />
        <CategoryAddForm />
        <Spacer height={10} />
      </div>
    </>
  );
};

export default CategoryAdd;
