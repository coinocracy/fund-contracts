// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract VAOToken {
    string constant public NAME = "VAO Token";
    string constant public SYMBOL = "VT";
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    
    mapping(address => uint) public balances;
    address public deployer;
    
    constructor(){
        deployer = msg.sender;
        balances[deployer] = 1 * 1e18;
    }
    
    function name() public pure returns (string memory){
        return NAME;
    }
    
    function symbol() public pure returns (string memory) {
        return SYMBOL;
    }
    
    function decimals() public pure returns (uint8) {
        return 18;
    }
    
    function totalSupply() public pure returns (uint256) {
        return 10000000 * 1e18; //10M * 10^18 because decimals is 18
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];    
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        assert(balances[msg.sender] > _value);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        
        emit Transfer(msg.sender, _to, _value);
        
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if(balances[_from] < _value)
            return false;
        
        if(allowances[_from][msg.sender] < _value)
            return false;
            
        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        
        return true;
    }
    
    mapping(address => mapping(address => uint)) public allowances;
    
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowances[_owner][_spender];
    }
    
    mapping(uint => bool) public blockMined;
    uint public totalMinted = 1 * 1e18; //1M that has been minted to the deployer in constructor()
    
    function mine() public returns(bool success){
        if(blockMined[block.number] && totalSupply() > totalMinted + 1*1e18){
            return false;
        }
        balances[msg.sender] = balances[msg.sender] + 1*1e18;
        totalMinted = totalMinted + 1*1e18;
        return true;
    }
    
    
}