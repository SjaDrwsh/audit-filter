![npm version](https://img.shields.io/npm/v/yarn-audit-filter)  ![npm downloads](https://img.shields.io/npm/dt/yarn-audit-filter)


# Yarn Audit Filter

`yarn-audit-filter` is a command-line tool that filters `yarn audit` results based on specific advisory IDs. It helps you to identify and handle advisories in your project by allowing you to focus on relevant issues.

## Installation

You can install `yarn-audit-filter` globally using npm:

```bash
npm install yarn-audit-filter
```
Or, if you prefer using Yarn:

```bash
yarn add yarn-audit-filter -D
```

## Usage

### Filter Advisories Based on Specific IDs

If you want to filter advisories based on specific advisory IDs, you can pass them as command-line arguments:

```bash
npx filter-audit GHSA-2p57-rm9w-gvfp GHSA-876p-c77m-x2hc
````

### Adding to scripts
You can also add yarn-audit-filter to your project's scripts in package.json for easier usage:

```JSON
{
  "scripts": {
    "filter-audit-fixed": "filter-audit GHSA-2p57-rm9w-gvfp GHSA-876p-c77m-x2hc"
  }
}
```

### Yarn Version Support

yarn-audit-filter supports both **Yarn version 1** and **Yarn version 4**. Whether your project is using the classic Yarn (v1) or the modern version (v4), this tool integrates seamlessly with both versions to provide a consistent experience.

### Summary

- **Global Installation**: Use `npm` or `yarn global add` commands.
- **Local Installation**: Use `yarn add --dev` and run with `npx` or via `package.json` scripts.
- **Yarn Support**: Compatible with Yarn 1 and Yarn 4.

This documentation provides users with options for installing `yarn-audit-filter` globally or locally, and also shows how to integrate it into their project’s scripts for easier usage.


