# fabcoin-transfer

fobcoin.js:

  Chaincode Contract code in fobcoin.js file
  Which includesrequired functionalities (createUser, transferCoin, getBalance)
  
app.js  

  Node.js application to interact with the Fabric network using the Chaincode 
 
connection.json 

The connection.json file is a connection profile used by applications to connect to a specific Hyperledger Fabric network. It contains the necessary information and configuration details that allow your Node.js application to interact with the Fabric network, such as the network settings, organizations, peers, orderers, and other relevant information.  
You should replace the placeholders in this example (Org1, org1.example.com, paths to certificate files, etc.) with the actual configuration and certificate paths for your Hyperledger Fabric network.
  
In code:

1) We create a new user with the createUser transaction by specifying a user ID (userId) and an initial balance (initialBalance).

2) We transfer a specified amount of FabCoin from one user to another using the transferCoin transaction, specifying the sender's ID (senderId), receiver's ID (receiverId), and the transfer amount (transferAmount).

3) We query the balance of a user using the getBalance transaction by specifying the user ID (queryUserId) and printing the resulting balance.

# You can run Node.js application using:
node app.js

