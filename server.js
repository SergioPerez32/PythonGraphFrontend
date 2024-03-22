const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate-image', async (req, res) => {
  const pythonCode = req.body.pythonCode;

  try {
    const response = await axios.post('http://localhost:3000/python-to-image', pythonCode, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
