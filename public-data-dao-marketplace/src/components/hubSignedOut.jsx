import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import ContentBox from './ContentBox';

const HubSignedOut = () => {
  const { requestWallet } = useInjectedProvider();

  return (
    <ContentBox>
      <Flex
        direction='column'
        align='center'
        w='100%'
        bgSize='contain'
        bgPosition='center'
        bgRepeat='no-repeat'
        py={12}
      >
        <Box textAlign='left'>
          <Box fontSize='2xl' fontFamily='heading' fontWeight={700}>
            Welcome to KoioS
          </Box>
          <Text fontSize='xl' mb={5}>
            The Marketplace for the Data DAO Asset Class
          </Text>
          <Box fontSize='md' mb={5}>
            🔥 Find a Data DAO to invest in or Create a new one
          </Box>
          <Box fontSize='md' mb={5}>
            🚨 Get activity feeds from all your DAOs
          </Box>
          <Box fontSize='md' mb={5}>
            🌊️️️ Easily switch between your DAOs
          </Box>
          <Flex justify='center' w='100%'>
            <Button onClick={requestWallet} mb={6}>
              Connect Wallet
            </Button>
          </Flex>
        </Box>
      </Flex>
    </ContentBox>
  );
};

export default HubSignedOut;
