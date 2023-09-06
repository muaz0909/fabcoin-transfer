'use strict';

const { Contract } = require('fabric-contract-api');

class FabCoinContract extends Contract {
    async createUser(ctx, userId, initialBalance) {
        const userExists = await this.userExists(ctx, userId);
        if (userExists) {
            throw new Error(`User ${userId} already exists.`);
        }

        const user = {
            id: userId,
            balance: parseInt(initialBalance),
        };
        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
    }

    async transferCoin(ctx, senderId, receiverId, amount) {
        const sender = await this.getUser(ctx, senderId);
        const receiver = await this.getUser(ctx, receiverId);

        if (sender.balance < amount) {
            throw new Error(`Insufficient balance for user ${senderId}`);
        }

        sender.balance -= amount;
        receiver.balance += amount;

        await ctx.stub.putState(senderId, Buffer.from(JSON.stringify(sender)));
        await ctx.stub.putState(receiverId, Buffer.from(JSON.stringify(receiver)));
    }

    async getBalance(ctx, userId) {
        const user = await this.getUser(ctx, userId);
        return user.balance.toString();
    }

    async userExists(ctx, userId) {
        const userBuffer = await ctx.stub.getState(userId);
        return !!userBuffer && userBuffer.length > 0;
    }

    async getUser(ctx, userId) {
        const userBuffer = await ctx.stub.getState(userId);
        if (!userBuffer || userBuffer.length === 0) {
            throw new Error(`User ${userId} does not exist.`);
        }
        return JSON.parse(userBuffer.toString());
    }
}

module.exports = FabCoinContract;
