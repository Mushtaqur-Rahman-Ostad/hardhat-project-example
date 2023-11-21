// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Factory contract that creates clones
contract TestCloneFactory {
    address public template; // Address of the contract to clone

    constructor(address _template) {
        template = _template;
    }

    function createClone() external returns (address) {
        address clone = createCloneInternal();
        return clone;
    }

    function createCloneInternal() internal returns (address) {
        // Clone the template contract by creating a new contract with the same bytecode
        address clone;
        bytes20 targetBytes = bytes20(template);

        assembly {
            let cloneData := mload(0x40) // Get the current free memory pointer
            mstore(cloneData, 0x37)      // Store the length and start of the creation code
            mstore(add(cloneData, 0x20), targetBytes) // Place the target contract address in the creation code
            clone := create(0, cloneData, 0x37) // Create the contract
        }

        require(clone != address(0), "Failed to create clone");
        return clone;
    }
}

// Contract to be cloned
contract ExampleContract {
    uint256 public value;

    constructor(uint256 _initialValue) {
        value = _initialValue;
    }

    function updateValue(uint256 _newValue) public {
        value = _newValue;
    }
}