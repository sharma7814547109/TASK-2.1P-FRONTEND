// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

// Set up your Mailchimp configuration
mailchimp.setConfig({
  apiKey: '6c0cd6c9e31e0a0864006691f1f713b7-us10',
  server: 'us10' // e.g., 'us1', 'us2'
});
 
// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for handling GET requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route for handling POST requests
app.post('/', async (req, res) => {
    const email = req.body.email;
    const listId = "795247db24"; // Replace with your Mailchimp Audience/List ID

    const subscribingUser = {
        email: email
    };

    try {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed"
        });

        console.log('Successfully added contact as an audience member:', response);
        res.send("Subscription successful! Check your email.");
    } catch (error) {
        console.error('Error while adding contact to Mailchimp list:', error);
        res.send("Sorry, there was an error! Please try again.");
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
