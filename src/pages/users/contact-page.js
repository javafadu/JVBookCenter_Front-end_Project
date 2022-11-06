import React from "react";
import Spacer from "../../components/general/spacer/spacer";
import ContactBar from "../../components/users/contact/contact-bar";
import ContactMain from "../../components/users/contact/contact-main";
import ContactMap from "../../components/users/contact/contact-map";

const ContactPage = () => {
  return (
    <>
      <ContactBar />
      <Spacer height={10} />
      <ContactMain />
      <Spacer height={10} />
      <ContactMap />
    </>
  );
};

export default ContactPage;
