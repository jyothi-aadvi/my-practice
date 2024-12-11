const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/get', (req, res) => {
  res.send("GET request");
});

app.post('/post', (req, res) => {
  console.log('Received POST request:', req.body); 
  res.send("POST request received");
});

app.put('/put', (req, res) => {
  res.send("PUT request");
});

app.delete('/delete', (req, res) => {
  res.send("DELETE request");
});

app.patch('/patch', (req, res) => {
  res.send("PATCH request");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
