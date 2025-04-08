module.exports = {
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
  };
