const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/singup.html");
});

mailchimp.setConfig({
  apiKey: "c7e88fd193a5441d7adf1930176a426e-us14",
  server: "us14",
});

const event = {
  name: "JS Developers Meetup",
};

const footerContactInfo = {
  company: "Mailchimp",
  address1: "675 Ponce de Leon Ave NE",
  address2: "Suite 5000",
  city: "Atlanta",
  state: "GA",
  zip: "30308",
  country: "US",
};

const campaignDefaults = {
  from_name: "Gettin' Together",
  from_email: "gettintogether@example.com",
  subject: "JS Developers Meetup",
  language: "EN_US",
};

async function run() {
  const response = await mailchimp.lists.createList({
    name: event.name,
    contact: footerContactInfo,
    permission_reminder: "permission_reminder",
    email_type_option: true,
    campaign_defaults: campaignDefaults,
  });
  console.log(
    `Successfully created an audience. The audience id is ${response.id}.`
  );
}

run();

//id=515077
app.listen(3000, function () {
  console.log("Server Started on port 3000");
});
