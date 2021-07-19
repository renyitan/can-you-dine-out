import { useState } from 'react';

import { Button, Select } from '@chakra-ui/react';

function App() {
  const [numDiners, setNumDiners] = useState(0);
  return (
    <div className="App">
      <div>
        <h1>Number of diners</h1>
        <Select
          placeholder="Select Option"
          onChange={(event) => setNumDiners(event.target.value)}
        >
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Select>
      </div>

      {numDiners > 1 && (
        <div>
          <h1>Is there anyone above 12 years old fully vaccinated</h1>
          <Select placeholder="Select Option">
            <option value="option1">Yes</option>
            <option value="option2">No</option>
          </Select>
        </div>
      )}
    </div>
  );
}

export default App;
