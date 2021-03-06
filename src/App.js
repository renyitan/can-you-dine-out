import { useEffect, useState } from 'react';
import _ from 'lodash';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

const GITHUB_URL = 'https://github.com/renyitan';

const ST_INFOGRAPHIC_URL =
  'https://www.straitstimes.com/singapore/health/dine-in-group-size-cut-to-2-from-july-19-as-spore-tightens-covid-19-rules-but-up-to';

const STATUS = {
  ALLOWED: 'Allowed',
  NO_RESULTS: "Press 'Check' for results",
  NOT_ALLOWED: 'Not Allowed',
};

function App() {
  const [numDiners, setNumDiners] = useState(2);
  const [isEveryoneAboveTwelveVaccinated, setIsEveryoneAboveTwelveVaccinated] =
    useState(false);
  const [isDinersFromSameHousehold, setIsDinersFromSameHousehold] =
    useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(numDiners);

  const [isAllowed, setIsAllowed] = useState('');

  const numDinersBeyondLimits = () => numDiners <= 2 || numDiners >= 6;

  function reset() {
    setIsAllowed('');
    setNumDiners(2);
    setIsEveryoneAboveTwelveVaccinated(false);
    setIsDinersFromSameHousehold(false);
    setNumChildren(0);
  }

  useEffect(() => {
    if (numDiners === 2) reset();
  }, [numDiners]);

  useEffect(() => {
    setNumAdults(numDiners - numChildren);
  }, [numChildren, numDiners]);

  useEffect(() => {
    setIsAllowed('');
  }, [
    numDiners,
    isEveryoneAboveTwelveVaccinated,
    isDinersFromSameHousehold,
    numChildren,
  ]);

  function displayResults() {
    if (isAllowed === '') return STATUS.NO_RESULTS;
    else return isAllowed ? STATUS.ALLOWED : STATUS.NOT_ALLOWED;
  }

  function displayResultsBackground() {
    if (isAllowed === '') return 'gray.200';
    else return isAllowed ? 'green.200' : 'red.200';
  }

  function checkResults() {
    if (numDiners <= 2) {
      setIsAllowed(true);
      return;
    }
    if (numDiners >= 6) {
      setIsAllowed(false);
      return;
    }

    // case 1: all adults, no children
    if (numAdults === numDiners) {
      const isAllowed = isEveryoneAboveTwelveVaccinated;
      setIsAllowed(isAllowed);
      return;
    }

    // case 2: all children, no adults
    if (numAdults === 0) {
      // case 2a: if number of children less than 5
      const isAllowed = numChildren < 5;
      setIsAllowed(isAllowed);
      return;
    }

    // case 3: some children, some adults, same household
    if (isDinersFromSameHousehold) {
      // case 3a: adult(s) is or are vaccinated
      if (isEveryoneAboveTwelveVaccinated) {
        const isAllowed = numDiners <= 5 ? true : false;
        setIsAllowed(isAllowed);
      } else {
        setIsAllowed(false);
      }
      return;
    }

    // case 4: some children, some adults, different household
    if (!isDinersFromSameHousehold) {
      // case 4a: adults are fully vaccinated
      if (isEveryoneAboveTwelveVaccinated) {
        const isAllowed = numChildren / numDiners <= 0.5 ? true : false;
        setIsAllowed(isAllowed);
      } else {
        setIsAllowed(false);
      }
    }

    return;
  }

  return (
    <div>
      <Center marginX={10} marginY={5}>
        <Stack spacing={3}>
          <div>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Update: </AlertTitle>
              <AlertDescription>
                No dining out from 22 July to 18 Aug 2021
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <Heading as="h2" size="sm" marginBottom={2}>
              Can You Dine Out Safely?
            </Heading>

            <Text fontSize="xs">
              Based on COVID-19 Measures effective 19 Jul 2021 in Singapore
            </Text>
          </div>
          <div>
            <Center bg={displayResultsBackground} paddingY={4} marginY={2}>
              <Heading as="h5" size="sm">
                {displayResults()}
              </Heading>
            </Center>
          </div>

          <div>
            <Heading as="h5" size="sm">
              Total number of diners
            </Heading>

            <Select
              borderColor={'green.200'}
              borderWidth={2}
              value={numDiners}
              onChange={(event) => setNumDiners(parseInt(event.target.value))}
            >
              {_.times(5, (num) => (
                <option value={num + 1} key={num + 1}>
                  {num + 1}
                </option>
              ))}
              <option value={6}>More than 6</option>
            </Select>
          </div>

          <div>
            <Heading as="h5" size="sm">
              How many children are there?
            </Heading>

            <Select
              borderColor={numDinersBeyondLimits() ? 'gray.200' : 'green.200'}
              borderWidth={numDinersBeyondLimits() ? 1 : 2}
              disabled={numDinersBeyondLimits()}
              value={numChildren}
              onChange={(event) => setNumChildren(event.target.value)}
            >
              {_.range(0, numDiners + 1).map((diner) => (
                <option key={diner} value={diner}>
                  {diner}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Heading as="h5" size="sm">
              Is everyone above 12 years old fully vaccinated?
            </Heading>

            <Select
              borderColor={numDinersBeyondLimits() ? 'gray.200' : 'green.200'}
              borderWidth={numDinersBeyondLimits() ? 1 : 2}
              value={isEveryoneAboveTwelveVaccinated ? 'yes' : 'no'}
              disabled={numDinersBeyondLimits()}
              onChange={(event) =>
                setIsEveryoneAboveTwelveVaccinated(
                  event.target.value === 'yes' || false
                )
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </div>

          <div>
            <Heading as="h5" size="sm">
              Are all diners from the same household?
            </Heading>
            <Select
              borderColor={numDinersBeyondLimits() ? 'gray.200' : 'green.200'}
              borderWidth={numDinersBeyondLimits() ? 1 : 2}
              value={isDinersFromSameHousehold ? 'yes' : 'no'}
              disabled={numDinersBeyondLimits()}
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

          <ButtonGroup>
            <Button onClick={() => checkResults()} variant="outline">
              Check
            </Button>
            <Button onClick={() => reset()} variant="outline">
              Reset
            </Button>
          </ButtonGroup>
          <Divider />
          <Text fontSize="xs" color="gray.400">
            Developed by{' '}
            <a target="_blank" rel="noreferrer" href={GITHUB_URL}>
              <u>Renyi Tan</u>
            </a>
          </Text>
          <Text fontSize="xs" color="gray.400">
            Information from{' '}
            <a target="_blank" rel="noreferrer" href={ST_INFOGRAPHIC_URL}>
              <u>ST Infographics</u>
            </a>
          </Text>
        </Stack>
      </Center>
    </div>
  );
}

export default App;
