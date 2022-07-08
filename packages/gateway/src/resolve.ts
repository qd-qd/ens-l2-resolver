import { ethers } from 'ethers';
import { abi as L2Registry_abi } from './utils/L2Registry.json';
// import { abi as L2PublicResolver_abi } from './utils/L2PublicResolver.json';


// TODO:
// - Fix resolving for Bitcoin
// - Create mapping for all publicresolver getter
// - Clean
// - Fine a way to universally resolve them

const resolve = async (
  name: string,
  signature: string,
  args: ethers.utils.Result
) => {
  if (process.env.PRIVATE_KEY === undefined) throw new Error('no private key');
  if (process.env.REGISTRY_CONTRACT_ADDRESS === undefined)
    throw new Error('no registry address');

  const provider = new ethers.providers.JsonRpcProvider(
    'http://localhost:8002/',
    {
      chainId: 22222,
      ensAddress: process.env.REGISTRY_CONTRACT_ADDRESS,
      name: 'unknown',
    }
  );

  // Signer
  const customSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Node to resolve
  const nodeToResolve = name.replace('.mydao', '');

  // The Registry stored in the layer 2
  const l2Registry = new ethers.Contract(
    process.env.REGISTRY_CONTRACT_ADDRESS,
    L2Registry_abi,
    customSigner
  );

  const resolver = await provider.getResolver(nodeToResolve);

  if (signature === 'addr(bytes32)') {
    const value = await l2Registry.owner(ethers.utils.namehash(nodeToResolve));
    console.log('addr(bytes32)', value);
    return value;
  }
  if (signature === 'addr(bytes32,uint256)') {
    const { coinType } = args;
    const value = await resolver?.getAddress(coinType);
    console.log('addr(bytes32,uint256)', coinType, value);
    return value;
  }

  // const resolverAddress = await l2Registry.resolver(
  //   ethers.utils.namehash(nodeToResolve)
  // );
  // const l2PublicResolver = new ethers.Contract(
  //   resolverAddress,
  //   L2PublicResolver_abi,
  //   customSigner
  // );
  // console.log(l2PublicResolver.address);

  // const test = await provider['addr(bytes32)'](nodeToResolve);
  // console.log({ resolver });

  // const result = await l2PublicResolver[signature](
  //   ethers.utils.namehash(nodeToResolve)
  // );
  // console.log(signature);
  // const result = await l2PublicResolver['addr(bytes32)'](
  //   ethers.utils.namehash(nodeToResolve)
  // );
  // console.log({ result });

  // const address = await l2Registry.owner(ethers.utils.namehash(nodeToResolve));

  // return address;
};

export default resolve;
