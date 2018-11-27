import React from "react";

/*
    Fetch error helper
    @params {object} response
*/

export const handleResponse = response => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
};

/*
    Render change percent helper
    @param {string} percent
*/
export const renderChangePercent = percent => {
  if (percent > 0)
    return <span className="Percent__Raised">{percent}% &uarr;</span>;
  else if (percent < 0)
    return <span className="Percent__Fallen">{percent}% &darr;</span>;
  else return <span>{percent}</span>;
};
