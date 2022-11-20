import {
  RiBookMarkLine,
  RiDiscordFill,
  RiMediumFill,
  RiTwitterFill,
  RiGlobeLine,
  RiTeamLine,
  RiSettings3Line,
  RiBankLine,
  RiQuestionLine,
  RiFireLine,
  RiRocket2Line,
  RiSearch2Line,
  RiImage2Line,
  RiFileList2Line,
} from 'react-icons/ri';
import { FaDiscourse } from 'react-icons/fa';

// no slash on the path
export const defaultDaoData = [
  { icon: RiBookMarkLine, label: 'Proposals', path: 'proposals' },
  { icon: RiBankLine, label: 'Vaults', path: 'vaults' },
  { icon: RiTeamLine, label: 'Members', path: 'members' },
  {
    icon: RiImage2Line,
    label: 'Gallery',
    path: 'gallery',
  },
  { icon: RiFileList2Line, label: 'Documents', path: 'docs' },
  { icon: RiSettings3Line, label: 'Settings', path: 'settings' },
  { icon: RiRocket2Line, label: 'Boosts', path: 'settings/boosts' },
];
export const defaultHubData = [
  { icon: RiSearch2Line, label: 'Marketplace', path: '/explore' },
  { icon: RiFireLine, label: 'Create a Data Dao', path: '/summon' },
];

export const generateDaoLinks = (
  chainID,
  daoID,
  proposals,
  vaults,
  metadata,
) => {
  let links = [...defaultDaoData];
  const hasNfts = vaults.some(v => v.nfts.length);
  if (!hasNfts) {
    links = links.filter(link => link.label !== 'Gallery');
  }
  const boosts = metadata.boosts;
  if (!('POSTER' in boosts)) {
    links = links.filter(link => link.label !== 'Documents');
  }
  return links.map(link => {
    const path = `/dao/${chainID}/${daoID}/${link.path}`;
    return {
      ...link,
      path,
    };
  });
};

export const generateDaoLinksLoading = (chainID, daoID) => {
  let links = [...defaultDaoData];
  links = links.filter(
    link => link.label !== 'Gallery' && link.label !== 'Documents',
  );
  return links.map(link => {
    const path = `/dao/${chainID}/${daoID}/${link.path}`;
    return {
      ...link,
      path,
    };
  });
};

export const defaultSocialLinks = [
  {
    icon: RiDiscordFill,
    label: 'Discord',
    href: 'https://discord.gg/markobonna',
  },
  {
    icon: RiMediumFill,
    label: 'Blog',
    href: 'https://www.getrevue.co/profile/markobonna',
  },
  {
    icon: RiGlobeLine,
    label: 'Website',
    href: 'https://markobonna.com',
  },
  {
    icon: RiTwitterFill,
    label: 'Twitter',
    href: 'https://twitter.com/@markobonna',
  },
];

const socialLinksBaseUrls = {
  twitter: 'https://twitter.com/',
  discord: 'https://discord.gg/',
  telegram: 'https://t.me/',
  medium: 'https://medium.com/',
};

export const fixSocialLink = (type, unfixed) => {
  return !unfixed.includes(socialLinksBaseUrls[type])
    ? `${socialLinksBaseUrls[type]}${unfixed}`
    : unfixed;
};

export const generateDaoSocials = linksMetaObj => {
  if (!linksMetaObj) return;

  const fixedSocials = Object.keys(linksMetaObj).reduce(
    (acc, metaObjKey) => ({
      ...acc,
      [metaObjKey]:
        linksMetaObj[metaObjKey] &&
        socialLinksBaseUrls[metaObjKey] &&
        fixSocialLink(metaObjKey, linksMetaObj[metaObjKey]),
    }),
    {},
  );

  return defaultSocialLinks
    .filter(link => fixedSocials[link.label.toLowerCase()])
    .map(link => ({ ...link, href: fixedSocials[link.label.toLowerCase()] }));
};

export const generateDiscourseLink = metadata => {
  return {
    ...metadata,
    href: `https://forum.daohaus.club/c/${metadata.slug}/${metadata.categoryId}`,
    label: 'Discourse',
    icon: FaDiscourse,
  };
};
