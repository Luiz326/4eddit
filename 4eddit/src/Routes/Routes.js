import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import FeedPage from "../Pages/FeedPage";
import PostsPage from "../Pages/PostsPage";

function PrivateRoute({ component: Component, ...rest }) {
  const token = window.localStorage.getItem("token");

  const route = !token ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest} component={Component} />
  );

  return route;
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <PrivateRoute exact path="/posts" component={FeedPage} />
      <PrivateRoute exact path="/posts/:postId" component={PostsPage} />
    </Switch>
  );
};

export default Routes;
