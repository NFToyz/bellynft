module.exports = {
  reactStrictMode: true,
  strictMode: true,
  async redirects() {
    return [
      {
        source: '/c/:id*',
        destination: '/cards/:id*',
        permanent: true,
      },
    ];
  },
};
