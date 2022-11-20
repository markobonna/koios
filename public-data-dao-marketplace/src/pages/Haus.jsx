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
                  <Link
                    href='https://app.balancer.fi/#/trade/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0xf2051511B9b121394FA75B8F7d4E7424337af687'
                    isExternal
                  >
                    <Text fontSize='sm'>ON ETHEREUM &gt;</Text>
                  </Link>
                  <Link
                    href='https://swapr.eth.link/#/swap?chainId=100&outputCurrency=0xb0c5f3100a4d9d9532a4cfd68c55f1ae8da987eb'
                    isExternal
                  >
                    <Text fontSize='sm'>ON GNOSIS CHAIN &gt;</Text>
                  </Link>
                </Flex>
                <Flex direction='column'>
                  <Text fontSize='xl' mb='13px'>
                    Provide Liquidity
                  </Text>
                  <Link
                    href='https://app.balancer.fi/#/pool/0x17ddd9646a69c9445cd8a9f921d4cd93bf50d108000200000000000000000159'
                    isExternal
                  >
                    <Text fontSize='sm'>ON ETHEREUM &gt;</Text>
                  </Link>
                  <Link
                    href='https://swapr.eth.link/#/pools/0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1/0xb0C5f3100A4d9d9532a4CfD68c55F1AE8da987Eb?chainId=100'
                    isExternal
                  >
                    <Text fontSize='sm'>ON GNOSIS CHAIN &gt;</Text>
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
