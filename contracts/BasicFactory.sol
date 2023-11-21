// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;
import "./Basic.sol";
contract BasicFactory {
    Basic[] private _basics;
    function createBasic(
        string memory name
    ) public {
        Basic basic = new Basic(
            name,
            msg.sender
        );
        _basics.push(basic);
    }
    function allBasics(uint256 limit, uint256 offset)
        public
        view
        returns (Basic[] memory coll)
    {
        return coll;
    }
}