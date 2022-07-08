import express from 'express';
import { readFileSync } from 'fs';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
// import { abi } from './publicResolver.json';
import { abi as Resolver_abi } from '@ensdomains/ens-contracts/artifacts/contracts/resolvers/Resolver.sol/Resolver.json';

dotenv.config({ path: './.env.local' });

const Resolver = new ethers.utils.Interface(Resolver_abi);

const app = express();
const PORT = process.env.PORT || '8080';

let privateKey: string | Uint8Array | undefined = process.env.PRIVATE_KEY;
if (privateKey === undefined) throw new Error('no private key');
if (privateKey.startsWith('@')) {
  privateKey = ethers.utils.arrayify(
    readFileSync(privateKey.slice(1), { encoding: 'utf-8' })
  );
}
const address = ethers.utils.computeAddress(privateKey);

// define a route handler for the default home page
app.get('/:sender/:data', (req/*, res*/) => {
  const { /*sender, */data } = req.params as { sender: string; data: string };
  console.log({data});
  const { signature } = Resolver.parseTransaction({ data });
  console.log({ signature });
  // console.log({ sender, data });
  // res.status(200).json({ sender, data });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Serving 2 on port ${PORT} with signing address ${address}`);
});
