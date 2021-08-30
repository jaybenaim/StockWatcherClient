import { SET_WINDOW_WIDTH, GET_SCREEN_SIZE } from "../types";

const initialState = {
  windowWidth: window.innerWidth,
  screenSize: 'wide'
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
      console.log(state.windowWidth, window.innerWidth)

      state.windowWidth = window.innerWidth
      setScreenSize()
      return {...state};
    case GET_SCREEN_SIZE:
      setScreenSize()
      return state
    default:
      return {...state};
  }
}
