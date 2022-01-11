export const UPDATE_WEATHER = "UPDATE_WEATHER";

export const updateWeather = (data) => ({
  type: UPDATE_WEATHER,
  payload: data,
});
