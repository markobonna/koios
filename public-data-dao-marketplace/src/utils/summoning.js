import { utils } from 'web3';
import { supportedChains } from './chain';

export const parseSummonersAndShares = data => {
  if (!data) {
    return [[], []];
  }
  const lines = data.split(/\r?\n/);
  const addrs = [];
  const amounts = [];
  lines.forEach(line => {
    const summoner = line.split(/\s+/);
    addrs.push(summoner[0]);
    amounts.push(summoner[1]);
  });
  return [addrs, amounts];
};

export const validateSummonresAndShares = data => {
  const [addrs, amounts] = parseSummonersAndShares(data);
  let errMsg = true;
  if (!addrs.length || !amounts.length) {
    errMsg = 'Something went wrong with the summoner list';
    return errMsg;
  }
  addrs.forEach(addr => {
    try {
      utils.toChecksumAddress(addr);
    } catch (err) {
      errMsg = err.message;
    }
  });

  amounts.forEach(amount => {
    if (amount % 1 !== 0) {
      errMsg = 'Only whole share amounts allowed';
    }
  });
  return errMsg;
};

export const periodsPerDayPreset = seconds => {
  const hours = +seconds / 60 / 60;

  const perDay = Math.ceil(24 / hours);

  if (24 / hours < 1) {
    return `Less than ${perDay} per day`;
  }
  return `${perDay} per day`;
};

export const formatPeriodLength = (periods, duration) => {
  const periodSeconds = +periods * duration;
  const days = periodSeconds / 60 / 60 / 24;
  return `${days} day${days > 1 ? 's' : ''}`;
};

export const formatDepositWei = amount => {
  return utils.fromWei(amount.toString(), 'ether');
};

export const daoConstants = chainId => {
  const constants = {
    abortWindow: '1',
    dilutionBound: '3',
    version: '2.1',
  };

  if (chainId === '0x64') {
    constants.approvedToken = supportedChains['0x64'].wrapper_contract;
  }

  return constants;
};

export const daoPresets = chainId => {
  let presets = [
    {
      presetName: 'Investment',
      presetSubtitle: 'Invest together in any asset classs',
      presetDescription: 'Invest together in any asset class.',
      currency: 'FIL',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '60',
      gracePeriod: '24',
      proposalDeposit: '5000000000000000000',
      processingReward: '2000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#9fc5e8',
      version: '2.1',
    },
    {
      presetName: 'Research',
      presetSubtitle: 'Coordinate Research and Development',
      presetDescription: 'Coordinate Research and Development.',
      currency: 'FIL',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '4320',
      gracePeriod: '2880',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '60',
      summonerShares: 1,
      color: '#f44336',
      version: '2.1',
    },
    {
      presetName: 'Gaming & Sports',
      presetSubtitle: 'Invest together in you favorite games and sports teams',
      presetDescription:
        'From online games to professional sports, data is at the heart of winning championships.',
      currency: 'FIL',
      approvedToken: supportedChains[chainId].wrapper_contract,
      votingPeriod: '7',
      gracePeriod: '7',
      proposalDeposit: '100000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '86400',
      summonerShares: 1,
      color: '#6aa84f',
      version: '2.1',
    },
    {
      presetName: 'Retail',
      presetSubtitle: 'Retailers need data to win',
      presetDescription: 'Retailers need data to win.',
      currency: 'FIL',
      approvedToken: supportedChains[chainId].wrapper_contract,
      votingPeriod: '168',
      gracePeriod: '72',
      proposalDeposit: '10000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '3600',
      summonerShares: 1,
      color: '#ea8923',
      version: '2.1',
    },

    {
      presetName: 'Philanthropic',
      presetSubtitle: 'Do good together',
      presetDescription:
        'Support noble causes from Foundations, to grants, to donations, to social impact organization.',
      currency: 'FIL',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '60',
      gracePeriod: '36',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#513e97',
      version: '2.1',
    },
  ];

  if (chainId === '0x64') {
    presets = presets.map(preset => {
      preset.currency = 'WXDAI';
      preset.approvedToken = supportedChains[chainId].wrapper_contract;
      preset.proposalDeposit = '10000000000000000000';
      preset.processingReward = '1000000000000000000';

      return preset;
    });
  }

  if (chainId === '0x89') {
    presets = presets.map(preset => {
      preset.currency = 'WMATIC';
      preset.approvedToken = supportedChains[chainId].wrapper_contract;
      preset.proposalDeposit = '10000000000000000000';
      preset.processingReward = '1000000000000000000';

      return preset;
    });
  }

  if (chainId === '0x5') {
    presets = presets.map(preset => {
      preset.currency = 'WETH';
      preset.approvedToken = supportedChains[chainId].wrapper_contract;
      preset.proposalDeposit = '10000000000000000000';
      preset.processingReward = '1000000000000000000';

      return preset;
    });
  }

  if (chainId === '0xa4ec') {
    presets = presets.map(preset => {
      preset.currency = 'CELO';
      preset.approvedToken = supportedChains[chainId].wrapper_contract;
      preset.proposalDeposit = '10000000000000000000';
      preset.processingReward = '1000000000000000000';

      return preset;
    });
  }

  if (chainId === '0xa') {
    presets = presets.map(preset => {
      preset.currency = 'ETH';
      preset.approvedToken = supportedChains[chainId].wrapper_contract;
      preset.proposalDeposit = '10000000000000000000';
      preset.processingReward = '1000000000000000000';

      return preset;
    });
  }

  return presets;
};

export const currencyOptions = chainId => {
  let options;

  if (chainId === '0x64') {
    options = [
      {
        value: 'WXDAI',
        label: 'WXDAI',
        address: supportedChains[chainId].wrapper_contract,
      },
    ];
  } else if (chainId === '0x89') {
    options = [
      {
        value: 'WMATIC',
        label: 'WMATIC',
        address: supportedChains[chainId].weth,
      },
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
    ];
  } else if (chainId === '0x4a') {
    options = [
      {
        value: 'WEIDI',
        label: 'WEIDI',
        address: supportedChains[chainId].weth,
      },
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
    ];
  } else if (chainId === '0xa4ec') {
    options = [
      {
        value: 'CELO',
        label: 'CELO',
        address: supportedChains[chainId].wrapper_contract,
      },
    ];
  } else if (chainId === '0xa' || chainId === '0x5') {
    options = [
      {
        value: 'ETH',
        label: 'ETH',
        address: supportedChains[chainId].wrapper_contract,
      },
    ];
  } else {
    options = [
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
      {
        value: 'WETH',
        label: 'WETH',
        address: supportedChains[chainId].wrapper_contract,
      },
    ];
  }

  return options;
};
