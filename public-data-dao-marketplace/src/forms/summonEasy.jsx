import React, { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import {
  Box,
  Text,
  Button,
  Flex,
  Link,
  Textarea,
  Heading,
  Icon,
} from '@chakra-ui/react';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import {
  daoPresets,
  formatPeriodLength,
  formatDepositWei,
  periodsPerDayPreset,
  validateSummonresAndShares,
} from '../utils/summoning';

const SummonEasy = ({ daoData, setDaoData, handleSummon }) => {
  const { injectedChain } = useInjectedProvider();
  const [multiSummoners, setMultiSummoners] = useState(false);
  const [currentError, setCurrentError] = useState(false);

  const selectPreset = preset => {
    setDaoData(prevState => {
      return { ...prevState, ...preset };
    });
  };

  const handleMultiSummonerChange = e => {
    const { value } = e.target;
    const isValid = validateSummonresAndShares(value);

    if (isValid !== true) {
      setCurrentError(isValid);
      return;
    }
    setCurrentError(false);

    setDaoData(prevState => {
      return { ...prevState, summonerAndShares: value };
    });
  };

  const renderPresets = () => {
    return daoPresets(injectedChain.chain_id).map(preset => {
      const isSelected = daoData.presetName === preset.presetName;
      return (
        <Flex
          key={preset.presetName}
          onClick={() => selectPreset(preset)}
          cursor='pointer'
          borderColor='whiteAlpha.200'
          py={5}
          px={5}
          borderBottomWidth='1px'
          style={{
            background: isSelected ? preset.color : 'transparent',
          }}
          _hover={{
            background: isSelected ? preset.color : 'transparent',
          }}
          _first={{ borderTopLeftRadius: 6 }}
          _last={{ borderBottomLeftRadius: 6, borderBottomWidth: '0px' }}
        >
          <Box>
            <Heading
              as='h4'
              size='sm'
              style={{ color: isSelected ? 'white' : preset.color }}
            >
              {preset.presetName}
            </Heading>
            <Text>{preset.presetSubtitle}</Text>
          </Box>
        </Flex>
      );
    });
  };

  return (
    <Box>
      <Box
        d='flex'
        wrap='wrap'
        p='0px'
        bg='blackAlpha.800'
        borderWidth='1px'
        borderColor='whiteAlpha.200'
        borderRadius={5}
      >
        <Flex direction='column' w={['100%', null, null, null, '30%']}>
          {daoData ? <>{renderPresets()}</> : null}
        </Flex>
        <Flex
          direction='column'
          w={['100%', null, null, null, '70%']}
          borderLeftWidth='1px'
          borderColor='whiteAlpha.200'
        >
          {daoData?.currency ? (
            <Box mt={4} p={6}>
              <Flex direction='row' justify='space-between'>
                <Text
                  as='h2'
                  fontFamily='heading'
                  fontSize='2xl'
                  style={{ color: daoData.color }}
                >
                  Settings
                </Text>
              </Flex>
              <Text my={5}>{daoData.presetDescription}</Text>

              <Text>
                Primary Token:
                <strong>{daoData.currency}</strong>
              </Text>
              <Text>
                Proposal Velocity:
                <strong>{periodsPerDayPreset(daoData.periodDuration)}</strong>
              </Text>
              <Text>
                Voting Period:
                <strong>
                  {formatPeriodLength(
                    daoData.votingPeriod,
                    daoData.periodDuration,
                  )}
                </strong>
              </Text>
              <Text>
                Grace Period:
                <strong>
                  {formatPeriodLength(
                    daoData.gracePeriod,
                    daoData.periodDuration,
                  )}
                </strong>
              </Text>
              <Text>
                Proposal Deposit:
                <strong>
                  {`${formatDepositWei(daoData.proposalDeposit)} ${
                    daoData.currency
                  }`}
                </strong>
              </Text>
              <Text>
                Proposal Reward:
                <strong>
                  {`${formatDepositWei(daoData.processingReward)} ${
                    daoData.currency
                  }`}
                </strong>
              </Text>

              {multiSummoners ? (
                <Text>
                  Summoners and Shares. Enter one address and amount of shares
                  on each line, and include yourself. Separate address and
                  amount with a space. Be sure to include yourself as desired.
                  <Textarea
                    className='inline-field'
                    name='summonerAndShares'
                    placeholder={`${daoData.summoner} 1`}
                    onChange={e => handleMultiSummonerChange(e)}
                  />
                </Text>
              ) : null}

              <Box className='StepControl'>
                {currentError && (
                  <Box color='red.500' fontSize='m' mr={5}>
                    <Icon as={RiErrorWarningLine} color='red.500' mr={2} />
                    {currentError}
                  </Box>
                )}
                <Button onClick={() => handleSummon()} disabled={currentError}>
                  Create your Data Dao
                </Button>
              </Box>
            </Box>
          ) : (
            <Box p={6}>Select a preset</Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default SummonEasy;
