import supertest from 'supertest';
import { Application } from '../src/application/App.js';
import { TestUtils } from './utils/testUtils.js';

const amountDepositTest = 1000;
const amountWithdrawTest = -1000;
const maximumAmount = 10000000;
describe("Simulasi Transaksi Deposit/Withdraw", () => {
    beforeAll(async() => {
        await TestUtils.createUser();
    });

    test("Transaksi Deposit", async () => {
        const getUser = await TestUtils.getUser();
        let balance = 0;

        for( let i = 0; i < 100; i++ ) {
            for(let j = 0; j < 100; j++) {
                let response = await supertest(Application)
                .post('/api/transactions/credit')
                .send({
                    user_id: getUser.id,
                    amount: amountDepositTest
                });
                
                if( response.status !== 201 ) {
                    break;
                }

                console.log(response.body);
                balance = response.body.new_balance;
            }
        }

        expect(balance).toBe(maximumAmount);
    }, 200000);

    test("Transaksi Withdraw", async () => {
        const getUser = await TestUtils.getUser();
        let balance = null;

        for( let i = 0; i < 100; i++ ) {
            for(let j = 0; j < 100; j++) {
                let response = await supertest(Application)
                .post('/api/transactions/debit')
                .send({
                    user_id: getUser.id,
                    amount: amountWithdrawTest
                });
                
                if( response.status !== 201 ) {
                    break;
                }

                console.info(response.body);
                balance = response.body.new_balance;
            }
        }

        expect(balance).toBe(0);
    }, 200000);

    afterAll(async() => {
        await TestUtils.deleteTransaction();
        await TestUtils.deleteUser();
    })
});