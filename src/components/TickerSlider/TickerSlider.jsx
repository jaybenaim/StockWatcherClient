import React, { useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"

const TickerSlider = () => {

  return (
    <>
    </>
   );
}

TickerSlider.propTypes = {
  errors: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
};

export default connect(mapStateToProps, {})(TickerSlider);
