const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios')
const port = 5000;
let attacks = []; 
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());




// Get all attacks
app.get('/api/attacks', async (req, res) => {
  try {
    const { getAllAttacks } = await import('../fireBse/fireBaseHelper.js');
     attacks = await getAllAttacks();
    console.log(1);
    res.json(attacks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get attack by ID
app.get('/api/attacks/:id', async (req, res) => {
  try {
    const { getAttackById } = await import('../fireBse/fireBaseHelper.js');
    const attackId = req.params.id;
    const attack = await getAttackById(attackId);
    console.log(2332);

    if (!attack) {
      return res.sendStatus(404);
    }
    res.json(attack);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Search attacks by name


app.post('/api/search', (req, res) => {
  const { category, input } = req.body;
  try {
    let filteredAttacks = [];
    if (category === 'name') {
      filteredAttacks = attacks.filter((attack) =>
        attack.name.toLowerCase().includes(input.toLowerCase())
      );
    } else if (category === 'id') {
      filteredAttacks = attacks.filter((attack) =>
        attack.id.toLowerCase().includes(input.toLowerCase())
      );
    } else if (category === 'x_mitre_detection') {
      filteredAttacks = attacks.filter((attack) =>
        attack.x_mitre_detection.toLowerCase().includes(input.toLowerCase())
      );
    } else if (category === 'x_mitre_platforms') {
      filteredAttacks = attacks.filter((attack) =>
        attack.x_mitre_platforms.toLowerCase().includes(input.toLowerCase())
      );
    }
console.log(filteredAttacks)
    res.json(filteredAttacks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/chat', async (req, res) => {
  try {
    const message = req.body.message;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const reply = response.data.choices[0].message.content;
    console.log(reply);
    res.json({ reply });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});