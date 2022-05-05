// import de react
import React from "react";

// import de react dom
import ReactDOM from "react-dom";

// import de reportwebvitals
import reportWebVitals from "./reportWebVitals";

// import css
import "./index.css";

// import page app
import App from "./App";

// ce qui va nous renvoyer a la page app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
