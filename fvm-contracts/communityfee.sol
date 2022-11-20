pragma solidity 0.8.12;

// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0
import "../interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../utils/SafeERC20.sol";


contract CommunityFee is Ownable {
    using SafeERC20 for IERC20;
    address payable private collector;

    /**

     * @param newCollector the fee collector address.
     * @param OwnerAddress the contract owner address
     */
    constructor(address payable newCollector, address OwnerAddress)
        Ownable()
    {
        require(
            newCollector != address(0) && OwnerAddress != address(0),
        
        );
        collector = newCollector;
        transferOwnership(OPFOwnerAddress);
    }

    fallback() external payable {}


    receive() external payable {}


    function withdrawETH() external payable {
        collector.transfer(address(this).balance);
    }


    function withdrawToken(address tokenAddress) external {
        require(
            tokenAddress != address(0),
           
        );

        IERC20(tokenAddress).safeTransfer(
            collector,
            IERC20(tokenAddress).balanceOf(address(this))
        );
    }


    function changeCollector(address payable newCollector) external onlyOwner {
        require(
            newCollector != address(0),
    
        );
        collector = newCollector;
    }
}
