// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '4224',
    endpoints: {
      allRedirectrs: '/api/redirectrs',
      top3Redirectrs: '/api/redirectrs/top3',
      searchRedirectrs: '/api/redirectrs/search/:tags',
      oneRedirectrs: '/api/redirectrs/:id',
      accessRedirectrs: '/api/redirectrs/access/:id',
    }
  }
};
