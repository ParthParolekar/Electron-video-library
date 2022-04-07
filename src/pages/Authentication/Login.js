import React from "react";

import { LoginForm } from "../../components";

const Login = () => {
  return (
    <div className="auth-component card-shadow">
      <div className="auth-pages" id="auth-pages">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
