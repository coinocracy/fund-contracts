import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import { BigNumber, Signer } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { VAO, VAO__factory, VAOToken, VAOToken__factory } from "../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let accounts: SignerWithAddress[];
    let tokenContract: VAOToken;
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
    accounts = await hre.ethers.getSigners();
    const firstAddress = await accounts[0].getAddress();

    const tokenFactory = (await hre.ethers.getContractFactory(
        "VAOToken",
        accounts[0].address
    )) as VAOToken__factory;

    tokenContract = await tokenFactory.deploy();
    await tokenContract.deployed();

    const creator = firstAddress;
    const approvedTokens= [tokenContract.address];
    const periodDuration = 30;
    const votingPeriodLength = 35;
    const gracePeriodLength = 35;
    const proposalDeposit = hre.Web3.utils.toWei('0.1');
    const dilutionBound = 3;
    const processingReward = hre.Web3.utils.toWei('0.1');
    const vaoFundAddress = firstAddress;

    const vaoFactory = (await hre.ethers.getContractFactory(
        "VAO",
        accounts[0].address
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
