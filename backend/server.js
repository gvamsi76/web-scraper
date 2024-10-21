const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const emails = [];
    const phoneNumbers = [];

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = $('body').text();
    const foundEmails = bodyText.match(emailRegex);
    if (foundEmails) {
        emails.push(...foundEmails);
    }

    $('*').each((index, element) => {
      const text = $(element).text();
      const phoneRegex = /\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}/g;
      const phones = text.match(phoneRegex);
      if (phones) {
        phoneNumbers.push(...phones);
      }
    });

    res.json({ emails, phoneNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape the website' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
