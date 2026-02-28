const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');

// Initialize Express app
const app = express();

// Middleware for CORS
app.use(cors());  // Allow all origins in development

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Email schema using Joi (similar to Pydantic)
const emailSchema = Joi.object({
  sender: Joi.string().email().required(),
  subject: Joi.string().required(),
  body: Joi.string().required()
});

app.get('/', (req, res) => {
  res.send('Hello World!!=f')
})

// POST route to handle email details
app.post('/details/', (req, res) => {
  const { error, value } = emailSchema.validate(req.body);
  
  // If the email data is invalid, return 400
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Print the received email data
  console.log("Received email:", value);

  ///  Perform checks on the email (this is where your logic would go) ////
  
  // Dummy analysis result
  const result = {
    score: 55,
    level: "suspicious",
    headline: "Headline here",
    reasons: ["Urgent language detected", "Link looks unusual"],
    hostname: "google.ca",
    final_url: "goolpe.zy"
  };

  // Return the result as a JSON response
  res.json(result);
});

// Start the server on port 8000
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
