import React from "react";

import Navbar from "../../../components/users/dashboard/Navbar";
import Header from "../../../components/users/dashboard/Header";
import Main from "../../../components/users/dashboard/mainContent";

export default function Dashboard() {
  return (
      <React.Fragment>
        <Navbar />
        <Header />
        <Main />
      </React.Fragment>
  );
}
