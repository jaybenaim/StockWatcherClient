import { SET_WINDOW_WIDTH } from "../types";

const initialState = {
  windowWidth: window.innerWidth,
  screenSize: 'wide',
  isMobile: false
};

export default function(state = initialState, action) {
  const setScreenSize = () => {
      // Iphone x
      if (state.windowWidth <= 375) {
        state.screenSize = 'sm-phone'
      } else if (state.windowWidth > 375 && state.windowWidth <= 480) {
        state.screenSize = 'phone'
      } else if (state.windowWidth > 480 && state.windowWidth <= 768) {
        state.screenSize = 'mobile'
      } else if (state.windowWidth > 768 && state.windowWidth <= 992) {
        state.screenSize = 'tablet'
      } else if (state.windowWidth > 992 && state.windowWidth <= 1200) {
        state.screenSize = 'desktop'
      } else {
        state.screenSize = 'wide'
      }
  }

  switch (action.type) {
    case SET_WINDOW_WIDTH:
      state.windowWidth = window.innerWidth

      if (window.innerWidth <= 768) {
        state.isMobile = true
      } else {
        state.isMobile = false
      }

      setScreenSize()
      return {...state};
    default:
      return {...state};
  }
}
