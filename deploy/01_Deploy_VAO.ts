import { BigNumber, Signer } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { VAO, VAO__factory } from "../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let accounts: Signer[];
    let vaoContract: VAO;

    /*
        address _creator,
        address[] memory _approvedTokens,
        uint256 _periodDuration,
        uint256 _votingPeriodLength,
        uint256 _gracePeriodLength,
        uint256 _proposalDeposit,
        uint256 _dilutionBound,
        uint256 _processingReward,
        address _vaoFundAddress
    */
    const creator = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const approvedTokens= ["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"];
    const periodDuration = 17280;
    const votingPeriodLength = 35;
    const gracePeriodLength = 35;
    const proposalDeposit = hre.Web3.utils.toWei('10');
    const dilutionBound = 3;
    const processingReward = hre.Web3.utils.toWei('0.1');
    const vaoFundAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    accounts = await hre.ethers.getSigners();

    console.log(await accounts[0].getAddress());

    const vaoFactory = (await hre.ethers.getContractFactory(
        "VAO",
        accounts[0]
    )) as VAO__factory;

    vaoContract = await vaoFactory.deploy(creator, approvedTokens, periodDuration, votingPeriodLength, gracePeriodLength, proposalDeposit, dilutionBound, processingReward, vaoFundAddress);

    console.log(
        `The address the Contract WILL have once mined: ${vaoContract.address}`
    );

    console.log(
        `The transaction that was sent to the network to deploy the Contract: ${vaoContract.deployTransaction.hash}`
    );

    console.log(
        "The contract is NOT deployed yet; we must wait until it is mined..."
    );

    await vaoContract.deployed();

    console.log("Minted...");
};
export default func;
func.id = "vao_deploy";
func.tags = ["local"];
