import React, { Fragment } from "react";
import Tracks from "../tracks/Tracks";
import Search from "../tracks/Search";
function Index() {
  return (
    <Fragment>
      <Search />
      <Tracks />
    </Fragment>
  );
}

export default Index;
