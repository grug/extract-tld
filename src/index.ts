import { ParseOptions } from './types';
import tlds from '../tlds.json';

const parseUrl = (remoteUrl: string | URL, options?: ParseOptions) => {
  const combinedTlds = { ...tlds.icann, ...tlds.private };

  const hostname = new URL(remoteUrl).hostname;
  const parts = hostname.split('.');
  let stack = '';
  let tldLevel = -1;

  const roots = options?.allowPrivateTLD ? combinedTlds : tlds.icann;

  for (let i = parts.length - 1, part; i >= 0; i--) {
    part = parts[i];
    stack = stack ? part + '.' + stack : part;
    if (roots[stack]) {
      tldLevel = roots[stack];
    }
  }

  if (tldLevel == -1 && options?.allowUnknownTLD) {
    tldLevel = 1;
  }

  if (parts.length <= tldLevel || tldLevel == -1) {
    throw new Error(
      'Invalid TLD ' +
        JSON.stringify({
          parts,
          tldLevel,
          stack,
          allowUnknownTLD: options?.allowUnknownTLD,
        }),
    );
  }

  return {
    tld: parts.slice(-tldLevel).join('.'),
    domain: parts.slice(-tldLevel - 1).join('.'),
    sub: parts.slice(0, -tldLevel - 1).join('.'),
  };
};

export { parseUrl };
