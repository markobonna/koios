import Web3 from 'web3';

import NFTAbi from '../contracts/nft.json';
import { chainByID } from '../utils/chain';

export const NFTService = ({
  web3,
  chainID,
  tokenAddress,
  // atBlock = 'latest',
}) => {
  if (!web3) {
    const rpcUrl = chainByID(chainID).rpc_url;
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }
  const abi = NFTAbi;
  const contract = new web3.eth.Contract(abi, tokenAddress);
  return service => {
    if (service === 'tokenOfOwnerByIndex') {
      return async ({ accountAddr, index }) => {
        try {
          const tokenOfOwnerByIndex = await contract.methods
            .tokenOfOwnerByIndex(accountAddr, index)
            .call();
          return tokenOfOwnerByIndex;
        } catch (error) {
          console.error('ERR:', error);
        }
        return null;
      };
    }
    if (service === 'tokenURI') {
      return async ({ tokenId }) => {
        try {
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          return tokenURI;
        } catch (error) {
          console.error('ERR:', error);
        }
        return null;
      };
    }
    if (service === 'setApprovalForAll') {
      return async ({ args, address, poll }) => {
        const tx = await contract.methods[service](...args);
        return tx
          .send('eth_requestAccounts', { from: address })
          .on('transactionHash', txHash => {
            if (poll) {
              poll(txHash);
            }
          })
          .on('error', error => {
            console.error(error);
          });
      };
    }
    if (service === 'isApprovedForAll') {
      return async ({ args, address }) => {
        const tx = await contract.methods[service](...args);
        return tx.call({ from: address }).catch(err => {
          console.error(err);
        });
      };
    }
    return null;
  };
};
