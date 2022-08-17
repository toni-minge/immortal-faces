// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@                                        @@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@                                        @@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@       @@@@@@@      @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@       @@@@@@@      @@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@
//@@@@@@@             @@@@@@@             @@@@@@@@@@@@@@             @@@@@@@@@@@@@
//@@@@@@@             @@@@@@@             @@@@@@@@@@@@@@             @@@@@@@@@@@@@
//@@@@@@@             @@@@@@@             @@@@@@@@@@@@@@             @@@@@@@@@@@@@
//              @@@@@@       @@@@@@@@@@@@@                                  @@@@@@
//              @@@@@@       @@@@@@@@@@@@@                                  @@@@@@
//              @@@@@@       @@@@@@@@@@@@@                                  @@@@@@
//       @@@@@@@      @@@@@@@       @@@@@@@@@@@@@                    @@@@@@@
//       @@@@@@@      @@@@@@@       @@@@@@@@@@@@@                    @@@@@@@
//       @@@@@@@      @@@@@@@       @@@@@@@@@@@@@                    @@@@@@@
//
// =============================================================================
// Non-Fungible Faces
// Created by Toni Minge
// January 2022
// =============================================================================

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "base64-sol/base64.sol";

contract NonFungibleFaces is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // =============================================================================
    // Initial Data
    // =============================================================================

    uint256 public whitelist_cost = 0.01 ether;
    uint256 public public_cost = 0.08 ether;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmountPerTx = 1;
    bool public paused = false;

    // =============================================================================
    // Stored Data Structure
    // =============================================================================

    struct Attr {
        string name;
        string gender;
        string mood;
        string description;
        string base64;
        uint256 age;
        address minting_address;
    }

    // map attributes
    mapping(uint256 => Attr) public attributes;

    // map whitelist user
    mapping(address => uint8) private _allowList;


    constructor() ERC721("Non-Fungible Faces", "NFF"){}

    // =============================================================================
    // External Information
    // =============================================================================

    function currentSupply() public view returns (uint256) {
        return supply.current();
    }

    function totalSupply() public view returns (uint256) {
        return maxSupply;
    }

    function hasMintsLeft(address _wallet) public view returns (bool) {
        bool _hasMintsLeft = false;
        if (_allowList[_wallet] > 0) {
            _hasMintsLeft = true;
        }
        return _hasMintsLeft;
    }

    // =============================================================================
    // Mint Functions & JSON Export of Data
    // =============================================================================

    function mint(
        string memory _name,
        string memory _gender,
        string memory _mood,
        string memory _description,
        string memory _base64,
        uint256 _age
        ) public payable mintCompliance() {
            require(!paused, "The contract is paused!");

            if (_allowList[msg.sender] > 0) {
                require(msg.value >= whitelist_cost, "Insufficient funds!");
                _allowList[msg.sender] -= 1;
            } else {
                require(msg.value >= public_cost, "Insufficient funds!");
            }

            supply.increment();
            uint256 tokenId = supply.current();

            _safeMint(msg.sender, tokenId);
            attributes[tokenId] = Attr(_name, _gender, _mood, _description, _base64, _age, msg.sender);
    }

    //check total supply
    modifier mintCompliance() {
        require(supply.current() + 1 <= maxSupply, "Max supply exceeded!");
        _;
    }

    function generateSvg(uint256 tokenId) private view returns (string memory) {
        string memory finalSvg = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='640' height='640' viewBox='0 0 640 640'>";
        string memory base64 = attributes[tokenId].base64;

        finalSvg = string(abi.encodePacked(finalSvg, "<image height='640' width='640' x='0' y='0' image-rendering='pixelated' xlink:href='data:image/png;base64,", base64, "'></image>"));
        finalSvg = string(abi.encodePacked(finalSvg, "</svg>"));

        return string(finalSvg);
    }

    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "#', uint2str(tokenId) , ' ', attributes[tokenId].name, '",',
                    '"image_data": "', generateSvg(tokenId), '",',
                    '"description": "', attributes[tokenId].description, '",',
                    '"attributes": [{"trait_type": "gender", "value": "', attributes[tokenId].gender, '"},',
                    '{"trait_type": "mood", "value": "', attributes[tokenId].mood, '"},',
                    '{"trait_type": "age", "value": "', uint2str(attributes[tokenId].age), '"}',
                    ']}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }


    // =============================================================================
    // Admin Functions
    // =============================================================================

    function setWhitelistCost(uint256 _cost) public onlyOwner {
        whitelist_cost = _cost;
    }

    function setPublicCost(uint256 _cost) public onlyOwner {
        public_cost = _cost;
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function setAllowList(address[] calldata addresses, uint8 numAllowedToMint) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            _allowList[addresses[i]] = numAllowedToMint;
        }
    }

    function withdraw() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    // =============================================================================
    // Internal Functions
    // =============================================================================

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
