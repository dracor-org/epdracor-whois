import { makeId, stripEpId, idToName, guessSex } from './utils';

describe('makeId', () => {
  it('lowercases', () => {
    expect(makeId('FooBar')).toEqual('foobar');
  });
  it('handles numbers', () => {
    expect(makeId('Foo 123')).toEqual('foo-123');
  });
  it('replaces non alphanumeric caracters with single dash', () => {
    expect(makeId('Foo, Bar')).toEqual('foo-bar');
  });
  it('prefixes leading numbers', () => {
    expect(makeId('56 Foo')).toEqual('_56-foo');
  });
  it('strips leading or trailing dashes', () => {
    expect(makeId('.Foo %')).toEqual('foo');
  });
});

describe('stripEpId', () => {
  it('strips ID', () => {
    expect(stripEpId('A12345-julius-caesar')).toEqual('julius-caesar');
    expect(stripEpId('A12345_01-julius-caesar')).toEqual('julius-caesar');
  });

  it('does not strip non ID parts', () => {
    expect(stripEpId('julius-caesar')).toEqual('julius-caesar');
    expect(stripEpId('1234-julius-caesar')).toEqual('1234-julius-caesar');
  });
});

describe('idToName', () => {
  it('capitalizes ID parts', () => {
    expect(idToName('A12345_01-julius-caesar')).toEqual('Julius Caesar');
  });
});

describe('guessSex', () => {
  it('guesses FEMALE', () => {
    expect(guessSex('Mrs. Smith')).toEqual('FEMALE');
    expect(guessSex('Mrs Smith')).toEqual('FEMALE');
    expect(guessSex('MRS. SMITH')).toEqual('FEMALE');
  });

  it('guesses MALE', () => {
    expect(guessSex('Mr. Smith')).toEqual('MALE');
    expect(guessSex('Mr Smith')).toEqual('MALE');
    expect(guessSex('MR. SMITH')).toEqual('MALE');
  });
});
