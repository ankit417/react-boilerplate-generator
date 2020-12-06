import React from "react";
import PropTypes from "prop-types";

export default function ActivityIndicator(props) {
  const { animating, children, style } = props;

  if (animating) {
    return (
      <div style={style} className="activityindicator-container">
        <div className="activityindicator">
          <div className="activityindicator-loader"></div>
        </div>
      </div>
    );
  } else {
    return children;
  }
}

ActivityIndicator.propTypes = {
  animating: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ActivityIndicator.defaultProps = {
  animating: true,
};
