import { UPDATE_WEATHER } from "./index";

const initial_State = {
  weatherData: "",
};

export const reducer = (state = initial_State, action) => {
  switch (action.type) {
    case UPDATE_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return state;
  }
};
