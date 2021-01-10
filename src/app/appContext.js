import React from "react";

// app context to pass theme/layout information/data through the component tree without having to pass props
// down manually at every level
const AppContext = React.createContext({});

export default AppContext;