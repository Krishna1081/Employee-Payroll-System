const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if username and password are correct (you can replace this with your own logic)
  if (username === 'user' && password === 'password') {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ error: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
