import "./SignUp.scss";
const Signup = () => {
  return (
    <div className="registerForm-container">
      <form className="registerForm">
        <h1>Let&apos;s get started.</h1>
        <p className="registerInput-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </p>
        <p className="registerInput-container">
          <label htmlFor="name">First Name</label>
          <input type="text" name="name" id="name" />
        </p>
        <p className="registerInput-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </p>
        <p className="registerInput-container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </p>
        <button className="submitForm-button">Create Account</button>
        <span className="formSeprator">or</span>
        <button type="button" className="thirdParty-button">
          <img  src="/google-icon-logo-svgrepo-com.svg" />
          Continue with Google
        </button>
        <button type="button" className="thirdParty-button">
          <img  src="/facebook-icon-logo-svgrepo-com.svg" />
          Continue with Facebook
        </button>
      </form>
    </div>
  );
};

export default Signup;
