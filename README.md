# extract-tld

Extract the TLD from a URL against the [public suffix list](https://publicsuffix.org/).

## Getting started

Install the package using your preferred package manager:

```sh
npm install extract-tld
```

You can now use the parser:

```ts
import { parseUrl } from 'extract-tld';

parseUrl('https://google.com');
// { domain: 'google.com', sub: 'https://www', tld: 'com' }
```

## Private TLDs

[Private TLDs are supported](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/net/tools/tld_cleanup/README):

```ts
import { parseUrl } from 'extract-tld';

parseUrl('test.compute.amazonaws.com', { allowPrivateTLD: true });
// { domain: 'test.compute.amazonaws.com', sub: '', tld: 'compute.amazonaws.com' }
```

## Unknown TLDs

You can allow unknown TLDs by specifying the configuration option:

```ts
import { parseUrl } from 'extract-tld';

parseUrl('https://somewhere.local');
// Throws

parseUrl('https://somewhere.local', { allowUnknownTLD: true });
// { domain: 'http://somewhere.local', sub: '', tld: 'local' }
```

## Development

Ensure you have [pnpm](https://pnpm.io/) installed

- Clone this repository
- Run `pnpm install`

## Contributing

All contributions are welcome - feel free to open a PR or issue :)

## Credits

- [tld-extract](https://github.com/131/node-tld)
  - This is the main basis of inspiration for this library. I've basically taken this library and modernised it (and added some nice things like TypeScript support) as the author seems to be unreachable.
