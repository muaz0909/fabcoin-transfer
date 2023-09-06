const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const ccpPath = path.resolve(__dirname, 'connection.json');
        const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
        const ccp = JSON.parse(ccpJSON);

        const walletPath = path.resolve(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'user1',
            discovery: { enabled: true, asLocalhost: true },
        });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcoin');

        // Perform operations like creating users, transferring coins, and querying balances here.
		 
		// Creating a user
        const userId = 'user123';
        const initialBalance = 100;
        await contract.submitTransaction('createUser', userId, initialBalance.toString());
        console.log(`User ${userId} created with an initial balance of ${initialBalance} FabCoin`);

        // Transferring coins from one user to another
        const senderId = 'user123';
        const receiverId = 'user456';
        const transferAmount = 20;
        await contract.submitTransaction('transferCoin', senderId, receiverId, transferAmount.toString());
        console.log(`${transferAmount} FabCoin transferred from ${senderId} to ${receiverId}`);

        // Querying a user's balance
        const queryUserId = 'user123';
        const balance = await contract.evaluateTransaction('getBalance', queryUserId);
        console.log(`Balance of ${queryUserId}: ${balance.toString()} FabCoin`);


        await gateway.disconnect();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

main();
