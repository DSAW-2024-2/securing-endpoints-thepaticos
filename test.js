const { response } = require("express");

fetch('https://secure-routing-thepaticos.netlify.app/login', {
    method: 'POST',
    body: JSON.stringify({
        email: "admin@admin.com",
        password: "admin"
      }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });