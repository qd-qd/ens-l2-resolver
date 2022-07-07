const { ethers } = require("hardhat");
const { formatsByCoinType } = require("@ensdomains/address-encoder");

/*
 ** This script set additional informations for the qdqd.eth node.
 ** A name, a BITCOIN address, a COSMOS address, and a Twitter profile is set.
 */
module.exports = async ({ deployments }) => {
  const [, owner] = await ethers.getSigners();
  const node = ethers.utils.namehash("qdqd.eth");

  // Set BITCOIN address
  await deployments.execute(
    "L2PublicResolver",
    { from: owner.address, log: true },
    "setAddr(bytes32,uint256,bytes)",
    node,
    0,
    formatsByCoinType[0].decoder("bc1q8fnmuy9cfzmym062a93cuqh2l8l0p46gxy74pg")
  );

  // Set COSMOS address
  await deployments.execute(
    "L2PublicResolver",
    { from: owner.address, log: true },
    "setAddr(bytes32,uint256,bytes)",
    node,
    118,
    formatsByCoinType[118].decoder(
      "cosmos1g6n59apjxwk0lpah9aax6sfszsht7ycfnsg7cv"
    )
  );

  // Set DOGE address
  await deployments.execute(
    "L2PublicResolver",
    { from: owner.address, log: true },
    "setAddr(bytes32,uint256,bytes)",
    node,
    3,
    formatsByCoinType[3].decoder("DBs4WcRE7eysKwRxHNX88XZVCQ9M6QSUSz")
  );

  // Set twitter profile
  await deployments.execute(
    "L2PublicResolver",
    { from: owner.address, log: true },
    "setText",
    node,
    "com.twitter",
    "https://twitter.com/qdqd___"
  );
};

module.exports.tags = ["deploy-resolver-l2"];
