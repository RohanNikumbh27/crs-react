import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <>
      <div className="loginMenu">
        <h1 className="loginHeading">College Recommendation System</h1>
        <div className="form">
          <form action="/register" method="post" className="loginForm">
            <input name="username" type="text" placeholder="username" />
            <input name="password" type="password" placeholder="password" />
            <button type="submit">
              <b>Register</b>
            </button>
            <p className="message">
              Already have an Account?
              <Link to="/"> Login insead</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
