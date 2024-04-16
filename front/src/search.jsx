import { useState } from 'react';

import axios from 'axios';

const MyComponent = () => {
  const [response, setResponse] = useState(null);

  const sendData = async () => {
    try {
      const data = {
        Text: "Samsung"
      };

      const response = await axios.post('http://127.0.0.1:8000/search/', data);
      setResponse(response.data);
      console.log(response.data); // Print the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={sendData}>Send POST Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
