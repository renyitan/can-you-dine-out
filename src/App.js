import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Center,
  Flex,
  Grid,
  GridItem,
  Select,
  Stack,
} from '@chakra-ui/react';

function App() {
  const [numDiners, setNumDiners] = useState(2);
  const [isChildrenAboveTwelveVaccinated, setIsChildrenAboveTwelveVaccinated] =
    useState(false);
  const [isChildrenBelowTwelve, setIsChildrenBelowTwleve] = useState(false);
  const [isDinersFromSameHousehold, setIsDinersFromSameHousehold] =
    useState(false);
  const [numChildren, setNumChildren] = useState(1);
  const [numDinersWithChildren, setnumDinersWithChildren] = useState(0);
  const [isAllowed, setIsAllowed] = useState(true);

  function reset() {
    setNumDiners(2);
    setIsChildrenAboveTwelveVaccinated(false);
    setIsChildrenBelowTwleve(false);
    setIsDinersFromSameHousehold(false);
    setNumChildren(1);
    setnumDinersWithChildren(0);
  }

  useEffect(() => {
    if (numDiners === 2) reset();
  }, [numDiners]);

  useEffect(() => {
    setNumChildren(1);
  }, [isDinersFromSameHousehold]);

  function check() {
    if (numDiners <= 2) {
      setIsAllowed(true);
      return;
    }
    if (numDiners >= 6) {
      setIsAllowed(false);
      return;
    }

    if (!isChildrenAboveTwelveVaccinated) {
      setIsAllowed(false);
      return;
    }

    if (!isChildrenBelowTwelve) {
      setIsAllowed(true);
      return;
    }

    if (isDinersFromSameHousehold) {
      numChildren < 5 ? setIsAllowed(true) : setIsAllowed(false);
      return;
    }

    if (!isDinersFromSameHousehold) {
      if (numChildren === 1) {
        setIsAllowed(true);
        return;
      }

      if (numChildren >= 3) {
        setIsAllowed(false);
        return;
      }

      numDinersWithChildren <= 3 ? setIsAllowed(false) : setIsAllowed(true);
      return;
    }
    return;
  }

  return (
    <div>
      <Center>
        <Stack>
          <div>
            <h1>Number of diners</h1>
            <Select
              value={numDiners}
              onChange={(event) => setNumDiners(parseInt(event.target.value))}
            >
              <option value="2">1 -2 pax</option>
              <option value="5">3 -5 pax</option>
              <option value="6">6 pax or more</option>
            </Select>
          </div>

          <div>
            <h1>Is there anyone above 12 years old fully vaccinated</h1>
            <Select
              value={isChildrenAboveTwelveVaccinated ? 'yes' : 'no'}
              disabled={numDiners <= 2 || numDiners >= 6}
              onChange={(event) =>
                setIsChildrenAboveTwelveVaccinated(
                  event.target.value === 'yes' || false
                )
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>

          <div>
            <h1>Are there any children 12 years old and below?</h1>
            <Select
              value={isChildrenBelowTwelve ? 'yes' : 'no'}
              disabled={numDiners <= 2 || !isChildrenAboveTwelveVaccinated}
              onChange={(event) =>
                setIsChildrenBelowTwleve(event.target.value === 'yes' ?? false)
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>

          <div>
            <h1>Are all diners from the same household?</h1>
            <Select
              value={isDinersFromSameHousehold ? 'yes' : 'no'}
              disabled={
                numDiners <= 2 ||
                !isChildrenAboveTwelveVaccinated ||
                !isChildrenBelowTwelve
              }
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

          <div>
            <h1>How many children are there?</h1>
            {isDinersFromSameHousehold && (
              <Select
                disabled={
                  numDiners <= 2 ||
                  !isChildrenAboveTwelveVaccinated ||
                  !isChildrenBelowTwelve
                }
                value={numChildren}
                onChange={(event) =>
                  setNumChildren(parseInt(event.target.value))
                }
              >
                <option value="4">1 - 4 child</option>
                <option value="5">5 children</option>
              </Select>
            )}

            {!isDinersFromSameHousehold && (
              <Select
                disabled={
                  numDiners <= 2 ||
                  !isChildrenAboveTwelveVaccinated ||
                  !isChildrenBelowTwelve
                }
                value={numChildren}
                onChange={(event) =>
                  setNumChildren(parseInt(event.target.value))
                }
              >
                <option value="1">1 child</option>
                <option value="2">2 children</option>
                <option value="3">3 - 5 children</option>
              </Select>
            )}
          </div>

          {!isDinersFromSameHousehold && numChildren === 2 && (
            <div>
              <h1>How many diners in the group?</h1>
              <Select
                value={numDinersWithChildren}
                disabled={
                  numDiners <= 2 ||
                  !isChildrenAboveTwelveVaccinated ||
                  !isChildrenBelowTwelve
                }
                onChange={(event) =>
                  setnumDinersWithChildren(parseInt(event.target.value))
                }
              >
                <option value="3">3 diners</option>
                <option value="4">4 or 5 diners</option>
              </Select>
            </div>
          )}
          <ButtonGroup>
            <Button onClick={() => check()}>Check</Button>
            <Button onClick={() => reset()}>Reset</Button>
          </ButtonGroup>
        </Stack>

        <div>
          {isAllowed ? (
            <Box bg="green.200">Allowed</Box>
          ) : (
            <Box bg="red.200">Not Allowed</Box>
          )}
        </div>
      </Center>
    </div>
  );
}

export default App;
