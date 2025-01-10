// App.tsx
import React from "react";
import { Provider } from "react-redux"; // Import Redux Provider
import store from "./store/store"; // Adjust the path as necessary
import "./App.css"; // Use SCSS or CSS Modules as needed
import AppRoutes from "./routes";

const App: React.FC = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App;
