const { execSync } = require('child_process');

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('Yarn Audit Filter Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should filter advisories correctly', () => {
    execSync.mockReturnValue(`
      Yarn version: 1.22.22
      No relevant advisories found.
    `);

    const output = execSync('npx filter-audit GHSA-2p57-rm9w-gvfp').toString();
    expect(output).not.toContain('GHSA-2p57-rm9w-gvfp');
  });

  test('should handle no advisories found', () => {
    execSync.mockReturnValue(`
      Yarn version: 1.22.22
      No relevant advisories found.
    `);

    const output = execSync('npx filter-audit').toString();
    expect(output).toContain('No relevant advisories found.');
  });
});
