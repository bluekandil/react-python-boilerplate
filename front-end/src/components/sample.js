import React from "react";
import { Button } from 'antd';

import { helloApiUrl } from '../util/urls';


function Test() {

  // Function to handle button click and fetch data from the API
  const [apiResponse, setApiResponse] = React.useState(null);

  const handleClick = () => {        
      fetch(helloApiUrl)
      .then(response => response.json())
      .then(data => setApiResponse(data))
      .catch(error => console.error('Error:', error));
  }    

  return (
    <div>      
      <p>Test Component Loaded.</p>
      <Button type="primary" onClick={() => handleClick() }>API TEST</Button>
      {apiResponse && (
        <div>
          <p><pre>{apiResponse.message}</pre></p>         
        </div>
      )}
    </div>
  );
}

export default Test;
