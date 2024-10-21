import React, { useState } from 'react';
import axios from 'axios';

const DataScraper = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [emails, setEmails] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:9000/scrape', { url });
      console.log(response ,"response")
      const { emails, phoneNumbers } = response.data;

      setEmails(emails);
      setPhoneNumbers(phoneNumbers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
        />
        <button type="submit">Scrape Data</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Extracted Data:</h2>
          <h3>Emails:</h3>
          <ul>
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>

          <h3>Phone Numbers:</h3>
          <ul>
            {phoneNumbers.map((phone, index) => (
              <li key={index}>{phone}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataScraper;
