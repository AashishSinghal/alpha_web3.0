// https://eth-ropsten.alchemyapi.io/v2/msQYefKRSkBtvQRInsL1XgM79MbySTh-

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/msQYefKRSkBtvQRInsL1XgM79MbySTh-",
      accounts: [
        "3aead550fec71ceed35289a73e239b558391e2626b330f17ca16dc80a4940ae1",
      ],
    },
  },
};
