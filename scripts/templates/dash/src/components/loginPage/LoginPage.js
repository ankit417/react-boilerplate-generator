import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import { useAuth } from "react-auth-navigation";

import { loginAction } from "../../actions/Actions";
import ActivityIndicator from "../hocs/ActivityIndicator.hoc";

import UsernameLogo from "../../assets/icons/username.png";
import PasswordLogo from "../../assets/icons/password.png";
import { InvertedButton } from "../common/button/Button.common";

const LoginPage = (props) => {
  const { handleLogin, toast } = useAuth();
  const { register, handleSubmit } = useForm();
  const { login, loginAction } = props;
  const { loading } = login;

  const onLogin = async (data) => {
    let body = {
      email: data.email,
      password: data.password,
    };
    loginAction(body, handleLogin, toast);
  };

  return (
    <div className="login-container">
      {/* <Header title="Login"/> */}
      <div className="login">
        <div className="login-title">MEMBER LOGIN</div>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="login-input">
            <div className="login-input-logo">
              <img src={UsernameLogo} alt="USERNAME" />
            </div>

            <input
              name="email"
              ref={register({ required: true })}
              type="text"
              className="login-input-field"
              placeholder="Email"
            />
          </div>

          <div className="login-input">
            <div className="login-input-logo">
              <img src={PasswordLogo} alt="PASSWORD" />
            </div>

            <input
              name="password"
              ref={register({ required: true })}
              type="password"
              className="login-input-field"
              placeholder="Password"
            />
          </div>

          <div className="login-submit">
            <ActivityIndicator
              animating={loading}
              style={{
                paddingBottom: 0,
              }}>
              <InvertedButton
                type="submit"
                title="LOGIN"
                style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
              />
            </ActivityIndicator>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginAction,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
