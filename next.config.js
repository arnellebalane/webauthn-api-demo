module.exports = {
  target: 'serverless',

  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push('bcrypt');
    }
    return config;
  },
};
