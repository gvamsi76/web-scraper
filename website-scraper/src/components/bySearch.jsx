import React, { useState } from 'react';
import axios from 'axios';

const DataScraper = () => {
  const [url, setUrl] = useState('https://google.com'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null); 

    try {
      const response = await axios.post('http://localhost:9000/scrape', { url });
    //   const bodyText = response.data;
      const { emails, phoneNumbers } = response.data;

    //   const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    //   const phoneRegex = /\d{3}[-.\s]??\d{3}[-.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-.\s]??\d{4}/g;

    //   const foundEmails = bodyText.match(emailRegex);
    //   const foundPhones = bodyText.match(phoneRegex);

    //   const emailFound = foundEmails && foundEmails.includes(searchTerm);
    //   const phoneFound = foundPhones && foundPhones.includes(searchTerm);

      setResult({
         emails, phoneNumbers 
    
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(result ,"result")

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for email or phone number"
      />
      <button type="submit">Search</button>
    </form>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h2>Search Results:</h2>
        {result?.emails?.length > 0 ? (
          <div>
            <h3>Found Emails:</h3>
            {result?.emails?.map((email, index) => (
              <p key={index}>{email}</p>
            ))}
          </div>
        ) : (
          <p>Email not found.</p>
        )}
        
        {result?.phoneNumbers?.length > 0 ? (
          <div>
            <h3>Found Phone Numbers:</h3>
            {result?.phoneNumbers?.map((phone, index) => (
              <p key={index}>{phone}</p>
            ))}
          </div>
        ) : (
          <p>Phone number not found.</p>
        )}
      </div>
    )}
  </div>
  );
};

export default DataScraper;
