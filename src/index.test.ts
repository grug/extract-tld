import { parseUrl } from './';

describe('parseUrl', () => {
  it('can parse an ICANN TLD', () => {
    expect(parseUrl('http://www.google.com')).toEqual({
      domain: 'google.com',
      sub: 'http://www',
      tld: 'com',
    });
  });

  it('can parse a private TLD when the option to allow private TLDs is set', () => {
    expect(parseUrl('test.compute.amazonaws.com')).toEqual({
      domain: 'amazonaws.com',
      sub: 'test.compute',
      tld: 'com',
    });

    expect(
      parseUrl('test.compute.amazonaws.com', { allowPrivateTLD: true }),
    ).toEqual({
      domain: 'test.compute.amazonaws.com',
      sub: '',
      tld: 'compute.amazonaws.com',
    });
  });

  it('should allow unknown TLDs when the option to allow unknown TLDs is set', () => {
    expect(
      parseUrl('http://somewhere.local', { allowUnknownTLD: true }),
    ).toEqual({ domain: 'http://somewhere.local', sub: '', tld: 'local' });
  });

  it('should throw on an unknown TLD when the option to allow unknown TLDs is not set', () => {
    expect(() => parseUrl('http://somewhere.local')).toThrow(/Invalid TLD/);
  });
});
