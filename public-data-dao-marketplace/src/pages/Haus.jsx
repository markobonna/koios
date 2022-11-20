import React from 'react';

import { Avatar, Box, Divider, Flex, Link, Text } from '@chakra-ui/react';
import ContentBox from '../components/ContentBox';
import Layout from '../components/layout';
import MainViewLayout from '../components/mainViewLayout';
import hausImg from '../assets/img/haus_icon.svg';
import HausCard from '../components/hausCard';

const Haus = () => {
  return (
    <Layout>
      <MainViewLayout header='Koios Token'>
        <Flex justifyContent='space-between'>
          <Flex direction='column' w='90%'>
            <ContentBox mt={6} maxW='800px'>
              <Flex justifyContent='space-between' css={{ gap: '15px;' }}>
                <Flex direction='column' maxW='325px' gap='19px'>
                  <Text fontSize='2xl' fontWeight='900'>
                    The Koios token aligns all Data DAOs on the platform.
                  </Text>
                  <Text fontSize='md' fontWeight='700'>
                    As we create more value together, that value flows back to
                    the Koios token, shared by all communities on the platform
                  </Text>
                </Flex>
                <Flex direction='column' alignItems='center'>
                  <Avatar
                    name='Haus logo'
                    src={hausImg}
                    size='lg'
                    css={{
                      height: '161px;',
                      width: '161px;',
                      marginBottom: '26px;',
                    }}
                  />
                </Flex>
              </Flex>
            </ContentBox>
            <Divider
              orientation='vertical'
              css={{
                border: '1px solid rgba(255, 255, 255, 0.15);',
                height: 'auto;',
                maxWidth: '800px;',
              }}
            />
            <ContentBox maxW='800px'>
              <Text fontSize='2xl' fontWeight='800' mb='43px'>
                Things to do with Koios
              </Text>
              <Flex justifyContent='space-between' fontWeight='700'>
                <Flex direction='column'>
                  <Text fontSize='xl' mb='13px'>
                    Get Koios
                  </Text>
                  <Link href='https://ethereum.org/' isExternal>
                    <Text fontSize='sm'>ON ETHEREUM &gt;</Text>
                  </Link>
                  <Link href='https://filecoin.io/' isExternal>
                    <Text fontSize='sm'>ON FILECOIN FVM &gt;</Text>
                  </Link>
                </Flex>
                <Flex direction='column'>
                  <Text fontSize='xl' mb='13px'>
                    Provide Liquidity
                  </Text>
                  <Link href='https://ethereum.org/' isExternal>
                    <Text fontSize='sm'>ON ETHEREUM &gt;</Text>
                  </Link>
                  <Link href='https://filecoin.io/' isExternal>
                    <Text fontSize='sm'>ON FILECOIN FVM &gt;</Text>
                  </Link>
                </Flex>
              </Flex>
            </ContentBox>
          </Flex>
          <Box w={['100%', null, null, null, '50%']}>
            <HausCard hideLink />
          </Box>
        </Flex>
      </MainViewLayout>
    </Layout>
  );
};

export default Haus;
