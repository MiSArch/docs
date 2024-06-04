# Website

This documentation for MiSArch is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
npm i
```

### Submodules

In both sections of this _README_, [Local Development](#local-development) and [Build](#build), the following command will be issued:

```
npm run update-graphql-docs
```

`update-graphql-docs` creates the GraphQL API documentation and for it to work it expects the submodule [schemas](https://github.com/MiSArch/schemas.git) to be initialized and up-to-date. Because of that we have to execute the following command at first (ideally right after `npm i`):

```
git submodule update --init
```

Note that `npm run render-diagrams` does not depend on the submodule.

### Local Development

```
npm run render-diagrams
npm run update-graphql-docs
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
npm run render-diagrams
npm run update-graphql-docs
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The page is automatically deployed to https://misarch.github.io on each commit on the main branch
