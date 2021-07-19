import { useState } from 'react';

import {
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function App() {
  const [numDiners, setNumDiners] = useState(0);
  const [isChildrenAboveTwelveVaccinated, setIsChildrenAboveTwelveVaccinated] =
    useState(false);
  const [isChildrenBelowTwelve, setIsChildrenBelowTwleve] = useState(false);
  const [isDinersFromSameHousehold, setIsDinersFromSameHousehold] =
    useState(false);

  const [numChildren, setNumChildren] = useState(0);
  const [numDinersWithChildren, setnumDinersWithChildren] = useState(0);
  return (
    <div className="App">
      <div>
        <h1>Number of diners</h1>
        <Select
          placeholder="Select Option"
          onChange={(event) => setNumDiners(event.target.value)}
        >
          <option value="2">1 -2 pax</option>
          <option value="5">3 -5 pax</option>
          <option value="6">6 pax or more</option>
        </Select>
      </div>

      {numDiners > 2 && (
        <div>
          <h1>Is there anyone above 12 years old fully vaccinated</h1>
          <Select
            placeholder="Select Option"
            onChange={(event) =>
              setIsChildrenAboveTwelveVaccinated(
                event.target.value === 'yes' ?? false
              )
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
      )}

      {numDiners > 2 && numDiners < 6 && isChildrenAboveTwelveVaccinated && (
        <div>
          <h1>Are there any children 12 years old and below?</h1>
          <Select
            placeholder="Select Option"
            onChange={(event) =>
              setIsChildrenBelowTwleve(event.target.value === 'yes' ?? false)
            }
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
      )}

      {numDiners > 2 &&
        numDiners < 6 &&
        isChildrenAboveTwelveVaccinated &&
        isChildrenBelowTwelve && (
          <div>
            <h1>Are all diners from the same household?</h1>
            <Select
              placeholder="Select Option"
              onChange={(event) =>
                setIsDinersFromSameHousehold(
                  event.target.value === 'yes' ?? false
                )
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>
        )}

      {numDiners > 2 &&
        numDiners < 6 &&
        isChildrenAboveTwelveVaccinated &&
        isChildrenBelowTwelve && (
          <div>
            <h1>How many children are there?</h1>
            <NumberInput
              defaultValue={0}
              onChange={(event) => setNumChildren(parseInt(event))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        )}

      {numDiners > 2 &&
        numDiners < 6 &&
        isChildrenAboveTwelveVaccinated &&
        isChildrenBelowTwelve &&
        numChildren === 2 && (
          <div>
            <h1>How many diners in the group?</h1>
            <Select
              placeholder="Select Option"
              onChange={(event) =>
                setnumDinersWithChildren(parseInt(event.target.value))
              }
            >
              <option value="3">3 diners</option>
              <option value="4">4 or 5 diners</option>
            </Select>
          </div>
        )}

      <Button>Check</Button>
    </div>
  );
}

export default App;
