//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Pricing {
    uint256 private price;

    function getPricing() public view returns (uint256) {
        return price + 100;
    }

    function setPricing(uint256 _price) public {
        price = _price;
    }
}
