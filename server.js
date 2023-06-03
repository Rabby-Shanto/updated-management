const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});


app.get('/crud', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});


app.post('/submit', function(req, res) {
  // Get the form data from the request body
  const formData = req.body;

  // Read the existing data from the JSON file
  let data = [];
  try {
    const jsonData = fs.readFileSync('data.json', 'utf8');
    data = JSON.parse(jsonData);
  } catch (err) {
    console.error(err);
  }

  // Add the new form data to the array
  data.push(formData);


  // Write the updated data to the JSON file
  fs.writeFile('data.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving form data');
    } else {
      res.sendFile(path.join(__dirname,'public','crud.html'))
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
