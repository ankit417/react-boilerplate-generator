import React from "react";
import PropTypes from "prop-types";

export const InputField = (props) => {
  const {
    name,
    innerRef,
    defaultValue,
    placeholder,
    style,
    onChange,
    className,
    type,
  } = props;
  return (
    <input
      name={name}
      ref={innerRef}
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      className={`inputfield ${className}`}
      placeholder={placeholder}
      type={type}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const TextAreaField = (props) => {
  const {
    name,
    innerRef,
    defaultValue,
    placeholder,
    style,
    onChange,
    className,
  } = props;
  return (
    <textarea
      name={name}
      ref={innerRef}
      cols={40}
      rows={5}
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      className={`textfield ${className}`}
      placeholder={placeholder}
    />
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
