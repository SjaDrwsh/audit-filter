const { execSync } = require('child_process');

test('should filter advisories correctly', () => {
  const output = execSync('npx filter-audit GHSA-2p57-rm9w-gvfp').toString();
  expect(output).not.toContain('GHSA-2p57-rm9w-gvfp');
});
