export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '4224',
    endpoints: {
      allRedirectrs: '/api/redirectrs',
      top3Redirectrs: '/api/redirectrs/top3',
      searchRedirectrs: '/api/redirectrs/search/:tags',
      oneRedirectrs: '/api/redirectrs/:id',
      accessRedirectrs: '/api/redirectrs/access/:id'
    }
  }
};
