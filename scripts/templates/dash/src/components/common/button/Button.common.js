import React from "react";
import PropTypes from "prop-types";

export const FloatButton = ({
  title,
  highlightText,
  highlightColor,
  style,
  onClick,
}) => {
  if (title.indexOf(highlightText) < 0) {
    console.error("NO HIGHLIGHT PART");
  }

  let titleWithoutHighlight = title.slice(0, title.indexOf(highlightText));
  let titleWithHighlight = title.slice(
    title.indexOf(highlightText),
    title.length,
  );

  return (
    <button {...{ onClick, style }} className="button floating">
      {titleWithoutHighlight}
      <span
        style={{ color: highlightColor }}
        className="text-font-rumpel text-blue">
        {titleWithHighlight}
      </span>
    </button>
  );
};

FloatButton.propTypes = {
  title: PropTypes.string.isRequired,
  highlightText: PropTypes.string.isRequired,
  highlightColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
};

FloatButton.defaultProps = {
  title: "Float Button",
  highlightText: "Button",
};

export const InvertedButton = ({ title, style, onClick }) => {
  return (
    <button {...{ onClick, style }} className="button inverted">
      {title}
    </button>
  );
};

InvertedButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

InvertedButton.defaultProps = {
  title: "Inverted",
};

export const DefaultButton = ({ title, style, onClick, defaultInvert }) => {
  return (
    <button
      {...{ onClick, style }}
      className={defaultInvert ? "button default-invert" : "button default"}>
      {title}
    </button>
  );
};

DefaultButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  defaultInvert: PropTypes.bool,
};

DefaultButton.defaultProps = {
  title: "Default",
};

export default DefaultButton;

export const IconButton = ({ icon, onClick }) => {
  return (
    <div {...{ onClick }} className="icon-button">
      {icon}
    </div>
  );
};

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  defaultInvert: PropTypes.bool,
};

IconButton.defaultProps = {
  title: "Default",
};
