import SignupComp from '../../../../Components/AuthComp/SignupComp/SignupComp';
import AuthVisualPanel from '../../../../Components/AuthComp/AuthVisualPanel.jsx';
import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="auth-page signup-page">
      <div className="auth-left">
        <div className="auth-logo">Ledgerly</div>
        <AuthVisualPanel variant="signup" />
      </div>

      <div className="auth-right">
        <div className="auth-card signup-card">
          <div className="signup-header">
            <h1>Create your account</h1>
            <p>Get powerful tools to track, plan, and grow your money.</p>
          </div>

          <SignupComp />

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
