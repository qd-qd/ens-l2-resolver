// SPDX-License-Identifier: MIT
import "@ensdomains/ens-contracts/contracts/resolvers/PublicResolver.sol";

contract L2PublicResolver is PublicResolver {
    constructor(ENS _ens, INameWrapper wrapperAddress)
        PublicResolver(_ens, wrapperAddress)
    {}

    /**
     * Returns the address associated with an ENS node.
     * @param node The ENS node to query.
     * @return The associated address.
     */
    // function addr(bytes32 node) override public view returns (address payable) {
    //     bytes memory a = addr(node, COIN_TYPE_ETH);
    //     if(a.length == 0) {
    //         return payable(0);
    //     }
    //     return bytesToAddress(a);
    // }

    // function addr(bytes32 node, uint coinType) virtual public view returns(bytes memory) {
    //     return _addresses[node][coinType];
    // }

}
