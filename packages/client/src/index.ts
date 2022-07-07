import { Command } from 'commander';
import ethers from 'ethers';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const program = new Command();
program
  .option('-p --provider <url>', 'web3 provider URL', 'http://localhost:8001/')
  .option('-i --chainId <chainId>', 'chainId', '11111')
  .option('-n --chainName <name>', 'chainName', 'unknown')
  .argument('<name>');

program.parse(process.argv);
const options = program.opts();
const ensAddress = process.env.REGISTRY_ADDRESS;
const chainId = parseInt(options.chainId);
const chainName = options.chainName;
const provider = new ethers.providers.JsonRpcProvider(options.provider, {
  chainId,
  name: chainName,
  ensAddress,
});

// TODO:
// - Fix getAddress for non-ethereum blockchains
// - Fix twitter account fetching
(async () => {
  const [name] = program.args;
  let [resolver, resolveName] = await Promise.all([
    provider.getResolver(name),
    provider.resolveName(name),
  ]);
  if (resolver) {
    const [
      ethAddress,
      // btcAddress,
      //   , dogeAddress, cosmosAddress
    ] = await Promise.all([
      resolver.getAddress(),
      // resolver.getAddress(0),
      //   resolver.getAddress(3),
      //   resolver.getAddress(118),
    ]);
    console.log(`eth address ${ethAddress}`);
    // console.log(`btc address ${btcAddress}`);
    // console.log(`doge address ${dogeAddress}`);
    // console.log(`cosmos address ${cosmosAddress}`);

    const resolverName = await resolver.name;
    const twitterAccount = await resolver.getText('com.twitter');
    console.log(`provider name ${resolveName}`);
    console.log(`resolver name ${resolverName}`);
    console.log(`twitter account ${twitterAccount}`);
  }
})();
