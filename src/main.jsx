import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/Store.jsx";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/usersSlice.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchPosts } from "./app/features/posts/postsSlice.jsx";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
