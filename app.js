const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { send } = require("process");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/singup.html");
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const last_Name = req.body.lastName;
  const email = req.body.email;
  //   const apiKEY = "c7e88fd193a5441d7adf1930176a426e-us14";
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: last_Name,
        },
      },
    ],
  };
  let jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/6e8cd07664";
  const options = {
    method: "POST",
    auth: "alejandriel:c7e88fd193a5441d7adf1930176a426e-us14",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

//id=515077
//list id=6e8cd07664
app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started on port 3000");
});
