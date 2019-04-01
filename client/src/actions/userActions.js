import axios from "axios";

import { GET_ERRORS, GET_PROFILE } from "./types";

export const addHours = (eduData, history) => dispatch => {
  axios
    .post("/api/users/workhours", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentProfile = () => dispatch => {
  axios
    .get("/api/users/current")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
