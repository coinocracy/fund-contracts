pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GuildBank is Ownable {
	using SafeMath for uint256;

	IERC20 private contributionToken; // contribution token contract reference

	event Withdrawal(address indexed receiver, uint256 amount);
	event FundsWithdrawal(address indexed applicant, uint256 fundsRequested);
	event AssetWithdrawal(IERC20 assetToken, address indexed receiver, uint256 amount);
	
	// contributionToken is used to fund ventures and distribute dividends, e.g., wETH or DAI
	constructor(address contributionTokenAddress) {
		contributionToken = IERC20(contributionTokenAddress);
	}

	// pairs to VentureMoloch member ragequit mechanism, funding proposals, or for dividend payments
	function withdraw(address receiver, uint256 amount) public onlyOwner returns (bool) {
		emit Withdrawal(receiver, amount);
		return contributionToken.transfer(receiver, amount);
	}
	
	// onlySummoner in Moloch can withdraw and administer investment tokens
	function adminWithdrawAsset(IERC20 assetToken, address receiver, uint256 amount) public onlyOwner returns(bool) {
		emit AssetWithdrawal(assetToken, receiver, amount);
		return IERC20(assetToken).transfer(receiver, amount);
	}
}
