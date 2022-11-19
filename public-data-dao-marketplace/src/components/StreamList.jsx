import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Skeleton, Text } from '@chakra-ui/react';

import { useDao } from '../contexts/DaoContext';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useOverlay } from '../contexts/OverlayContext';
import { useTX } from '../contexts/TXContext';
import { useDaoMember } from '../contexts/DaoMemberContext';
import { useUser } from '../contexts/UserContext';
import { SUPERFLUID_MINION_TX as TX } from '../data/txLegos/superfluidMinionTx';
import ContentBox from './ContentBox';
import TextBox from './TextBox';
import StreamListItem from './StreamListItem';
import StreamListItemV2 from './StreamListItemV2';
import { createPoll } from '../services/pollService';
import { SuperfluidMinionService } from '../services/superfluidMinionService';
import { MINION_TYPES, PROPOSAL_TYPES } from '../utils/proposalUtils';
import { supportedChains } from '../utils/chain';

const StreamList = ({ list, loadingStreams, balances, minionType }) => {
  const [loading, setLoading] = useState({
    active: false,
    proposalId: null,
  });
  const { daoOverview } = useDao();
  const { daoMember } = useDaoMember();
  const { daochain, daoid, minion } = useParams();
  const { address, injectedProvider } = useInjectedProvider();
  const {
    errorToast,
    successToast,
    setProposalModal,
    setTxInfoModal,
  } = useOverlay();
  const { refreshDao, submitTransaction } = useTX();
  const { cachePoll, resolvePoll } = useUser();
  const network = supportedChains[daochain]?.network;

  const cancelStream = async (proposalId, isActive) => {
    const pollAction = isActive ? 'minionCancelAction' : 'cancelProposal';
    const action = isActive ? 'cancelStream' : 'cancelAction';

    setLoading({
      active: true,
      condition: proposalId,
    });
    try {
      const poll = createPoll({ action: pollAction, cachePoll })({
        minionAddress: minion,
        proposalId,
        daoID: daoid,
        chainID: daochain,
        proposalType: PROPOSAL_TYPES.MINION_SUPERFLUID,
        actions: {
          onError: (error, txHash) => {
            errorToast({
              title: 'There was an error.',
            });
            resolvePoll(txHash);
            console.error(`Could not find a matching stream: ${error}`);
          },
          onSuccess: txHash => {
            successToast({
              title: 'Superfluid stream successfully cancelled.',
            });
            refreshDao();
            resolvePoll(txHash);
          },
        },
      });
      const onTxHash = () => {
        setProposalModal(false);
        setTxInfoModal(true);
      };
      const args = [proposalId];
      await SuperfluidMinionService({
        web3: injectedProvider,
        minion,
        chainID: daochain,
      })(action)({
        args,
        address,
        poll,
        onTxHash,
      });
      setLoading({
        active: false,
        condition: null,
      });
    } catch (err) {
      setLoading({
        active: false,
        condition: null,
      });
      console.log('error: ', err);
    }
  };

  const cancelStreamProposal = async stream => {
    setLoading({
      active: true,
      condition: stream.id,
    });
    try {
      const selectedMinion = daoOverview?.minions?.find(m => {
        return m.minionAddress === minion;
      });
      await submitTransaction({
        tx: TX.SAFE_CANCEL_SUPERFLUID_STREAM,
        localValues: {
          rateString: stream.currentFlowRate,
          receiverAddress: stream.receiver.id,
          senderAddress:
            selectedMinion.safeAddress || selectedMinion.minionAddress,
          superTokenAddress: stream.token.id,
        },
        values: {
          selectedMinion: minion,
          title: 'Cancel Superfluid Proposal',
        },
      });
    } catch (err) {
      console.log('error: ', err);
    }
    setLoading({
      active: false,
      condition: null,
    });
  };

  return (
    <Box>
      <Flex pt={4}>
        <TextBox size='md'>Streams History</TextBox>
      </Flex>
      <ContentBox mt={6}>
        <Flex>
          <Box w='15%' d={['none', null, null, 'inline-block']}>
            <TextBox size='xs'>Created At</TextBox>
          </Box>
          <Box w={['17%', null, null, '33%']}>
            <TextBox size='xs'>To</TextBox>
          </Box>
          <Box w='15%' d={['none', null, null, 'inline-block']}>
            <TextBox size='xs'>Rate</TextBox>
          </Box>
          <Box w='15%' d={['none', null, null, 'inline-block']}>
            <TextBox size='xs'>Streamed</TextBox>
          </Box>
          <Box w={['30%', null, null, '15%']}>
            <TextBox size='xs'>Actions</TextBox>
          </Box>
        </Flex>
        <Skeleton isLoaded={!loadingStreams}>
          {list?.length > 0 ? (
            list.map(stream =>
              minionType === MINION_TYPES.SAFE ? (
                <StreamListItemV2
                  stream={stream}
                  key={stream.id}
                  loading={loading}
                  cancelStream={cancelStreamProposal}
                  balances={balances}
                  daoMember={daoMember}
                  network={network}
                />
              ) : (
                <StreamListItem
                  stream={stream}
                  key={stream.createdAt}
                  loading={loading}
                  cancelStream={cancelStream}
                  balances={balances}
                  daoMember={daoMember}
                  network={network}
                />
              ),
            )
          ) : (
            <Text fontFamily='mono' mt='5'>
              No streams have been created
            </Text>
          )}
        </Skeleton>
      </ContentBox>
    </Box>
  );
};
export default StreamList;
