import React, { useState } from "react";
import {
  Modal,
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "react-uicomp";
import { useAuth } from "react-auth-navigation";

import { useForm } from "react-hook-form";
import { MdMenu, FaUserCircle } from "react-icons/all";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { passwordAction } from "../../../actions/Actions";
import ActivityIndicator from "../../hocs/ActivityIndicator.hoc";
import Breadcrumb from "../breadcrumb/Breadcrumb.common";
import { InvertedButton } from "../button/Button.common";
import { InputField } from "../inputField/InputField.common";

const Header = (props) => {
  const { setSideNavVisible, handleLogout, toast } = useAuth();
  const { handleSubmit, register } = useForm();
  const { passwordAction, login } = props;
  const { passwordLoader } = login;
  const [visible, setVisible] = useState(false);

  const onSubmit = (data) => {
    let body = {
      oldPass: data.oldPassword,
      newPass: data.newPassword,
    };
    if (
      data.newPassword === data.confirmPassword &&
      data.newPassword.length > 7
    ) {
      passwordAction(body, modalCloseHandler, toast);
    } else if (data.newPassword.length < 7) {
      toast({
        message: "Password must be atleaset 8 characters",
        type: "error",
      });
    } else {
      toast({
        message: "Password doesn't match. Please recheck",
        type: "error",
      });
    }
  };

  const modalCloseHandler = () => {
    setVisible(false);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-menu" onClick={() => setSideNavVisible(true)}>
          <MdMenu />
        </div>

        <div className="header-breadcrumb">
          <Breadcrumb />
        </div>

        <div className="logged-user">
          <Dropdown
            placement="topright"
            style={{ top: 0 }}
            triggerElement={({ active }) => (
              <div
                className={
                  active ? "logged-user-icon active" : "logged-user-icon"
                }>
                <FaUserCircle size={24} />
              </div>
            )}>
            <DropdownMenu>
              <DropdownMenuItem
                className="menuItem"
                onClick={() => setVisible(true)}>
                Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="menuItem danger"
                onClick={() => handleLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
          <Modal visible={visible} onOutsideClick={() => setVisible(false)}>
            <h3 style={{ marginBottom: 20 }}>Change Password</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                rowGap: 10,
              }}>
              <InputField
                name="oldPassword"
                placeholder="Old Password"
                type="password"
                innerRef={register({ required: true })}
              />
              <InputField
                name="newPassword"
                placeholder="New Password"
                type="password"
                innerRef={register({ required: true })}
              />
              <InputField
                name="confirmPassword"
                placeholder="Confrim Password"
                type="password"
                innerRef={register({ required: true })}
              />
              <ActivityIndicator animating={passwordLoader}>
                <InvertedButton title="Submit" type="sumbit" />
              </ActivityIndicator>
            </form>
          </Modal>
        </div>
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
      passwordAction,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
