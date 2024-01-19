import { Container, Flex } from '@chakra-ui/react';
import CouncilTabs from '../components/CouncilTabs/CouncilTabs';
import { CouncilSlugs } from '../utils/councils';
import { useParams } from 'react-router-dom';
import UserActionBox from '../components/UserActionBox/UserActionBox';
import CouncilInformation from '../components/CouncilInformation/CouncilInformation';
import { useGetCurrentPeriod } from '../queries/useGetCurrentPeriod';
import CouncilNominees from '../components/CouncilNominees/CouncilNominees';

export default function Councils() {
  const { council } = useParams();
  const activeCouncil = council as CouncilSlugs;
  const { data: councilPeriod } = useGetCurrentPeriod(activeCouncil);

  return (
    <Flex flexDirection="column" alignItems="center">
      <CouncilTabs activeCouncil={activeCouncil} />
      <Container
        maxW={{ base: '100%', md: '768px', lg: '1280px' }}
        justifyContent="flex-start"
        w="100%"
      >
        <CouncilInformation activeCouncil={activeCouncil} />
      </Container>
      <Container
        maxW={{ base: '100%', md: '768px', lg: '1280px' }}
        gap={4}
        as={Flex}
        // justifyContent="space"
        flexDirection="row"
        w="100%"
      >
        <Flex flexDir="column" maxW="735px" w="100%">
          {(councilPeriod === '1' || councilPeriod === '2') && (
            <CouncilNominees activeCouncil={activeCouncil} />
          )}
          {/* <PassedElectionAccordion
            activeCouncil={councils.find(
              (council) => council.slug === (activeCouncil)
            )}
          /> */}
        </Flex>
        <UserActionBox activeCouncil={activeCouncil} />
      </Container>
    </Flex>
  );
}
