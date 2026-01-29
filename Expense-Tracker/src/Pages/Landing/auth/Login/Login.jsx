
import LoginComp from '../../../../Components/AuthComp/LoginComp/LoginComp';
import AuthVisualPanel from '../../../../Components/AuthComp/AuthVisualPanel.jsx';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-page login-page">
      <div className="auth-left">
        <div className="auth-logo">Ledgerly</div>
        <AuthVisualPanel variant="login" />
      </div>

      <div className="auth-right">
        <div className="auth-card login-card">
          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue your financial journey.</p>
          </div>

          <LoginComp />

          <div className="login-footer">
            <p>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
