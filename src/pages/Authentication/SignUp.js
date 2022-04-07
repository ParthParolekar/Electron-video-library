import React from "react";

import { SignupForm } from "../../components";

const Signup = () => {
  return (
    <div className="auth-component card-shadow">
      <div className="auth-pages" id="auth-pages">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
