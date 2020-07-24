import React from "react";
import Routes from "./Routes/Routes";
import { BrowserRouter } from 'react-router-dom'


const App = () => {
  return (
        <BrowserRouter>
          {/* <AppContainer token={getToken()}> */}
            <Routes />
          {/* </AppContainer> */}
        </BrowserRouter>
  );
}

export default App;
