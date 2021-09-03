import React, { useState } from 'react';
import PropTypes from "prop-types";
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { Button } from '@material-ui/core';
import { connect } from "react-redux"

const Carousel = () => {
  const [openSlider, setOpenSlider] = useState(false)
  const ModalProps = {
    BackdropProps: {
      invisible: true
    }
  }
  return (
  <div style={{ position: 'relative', width: '100%', height: 500 }}>
    <Button onClick={() => setOpenSlider(true)}>Open carousel</Button>
    <AutoRotatingCarousel
      label='Get started'
      open={openSlider}
      onClose={() => setOpenSlider(false)}
      onStart={() => setOpenSlider(false)}
      style={{ position: 'absolute' }}
      autoplay
      hideArrows
      landscape
      ModalProps={ModalProps}
      interval={5000}
    >
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
        mediaBackgroundStyle={{ backgroundColor: 400 }}
        style={{ backgroundColor: 600 }}
        title='This is a very cool feature'
        subtitle='Just using this will blow your mind.'
      />
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
        mediaBackgroundStyle={{ backgroundColor: 400 }}
        style={{ backgroundColor: 600 }}
        title='Ever wanted to be popular?'
        subtitle='Well just mix two colors and your are good to go!'
      />
      <Slide
        media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
        mediaBackgroundStyle={{ backgroundColor: 400 }}
        style={{ backgroundColor: 600 }}
        title='May the force be with you'
        subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
      />
    </AutoRotatingCarousel>
  </div>
   );
}

Carousel.propTypes = {
  errors: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
};

export default connect(mapStateToProps, {})(Carousel);
