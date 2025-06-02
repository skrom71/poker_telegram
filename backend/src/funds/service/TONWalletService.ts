import sleep from '@/lib/sleep'
import { roundToTwoDecimals } from '@pokertrust/shared/index'
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto'
import { Address, fromNano, internal, SendMode, TonClient, WalletContractV5R1 } from '@ton/ton'
import { addDepositTx, getDepositPendingTx, updateDepositPendingTx } from '../../mongodb/funds/deposit/DepositTonTxRepo'
import { balanceManager } from '../manager/BalanceManager'

class TONWalletService {
  private _client: TonClient

  constructor(endpoint: string, apiKey: string) {
    this._client = new TonClient({
      endpoint: endpoint,
      apiKey: apiKey,
    })
  }

  async generateWallet(): Promise<{ wallet: WalletContractV5R1; mnemonic: string[] }> {
    const mnemonic = await mnemonicNew()
    const keyPair = await mnemonicToWalletKey(mnemonic)

    const wallet = await WalletContractV5R1.create({
      publicKey: keyPair.publicKey,
      workchain: 0,
    })

    return { wallet, mnemonic }
  }

  async getWalletByMnemonic(mnemonic: string[]): Promise<WalletContractV5R1> {
    const keyPair = await mnemonicToWalletKey(mnemonic)

    const wallet = await WalletContractV5R1.create({
      publicKey: keyPair.publicKey,
      workchain: 0,
    })

    return wallet
  }

  async withdrawTonCheck(userId: string, userMnemonic: string[], destinationAddress: Address) {
    const minimalDepositUSD: number = 0.58
    const tonFee: number = 0.0055

    const keyPair = await mnemonicToWalletKey(userMnemonic)

    const wallet = await WalletContractV5R1.create({
      publicKey: keyPair.publicKey,
      workchain: 0,
    })

    const walletContract = this._client.open(wallet)
    const tonBalance = Number(fromNano(await walletContract.getBalance())) - tonFee

    const seqno = await walletContract.getSeqno()

    let tonBalanceUSD: number = 0.0
    let rate = { price: 3.002 } //await getTONUSDTRate()

    if (rate !== undefined && tonBalance > 0) {
      tonBalanceUSD = rate.price * tonBalance
    }

    if (tonBalanceUSD >= minimalDepositUSD) {
      const amount = tonBalance
      const userAddress = wallet.address.toString()
      const pendingTx = await getDepositPendingTx(userAddress)

      if (pendingTx === null) {
        await addDepositTx(userId, userAddress, destinationAddress.toString(), amount, seqno, 'pending')
        const sendMode = SendMode.CARRY_ALL_REMAINING_BALANCE | SendMode.PAY_GAS_SEPARATELY | SendMode.IGNORE_ERRORS

        await walletContract.sendTransfer({
          seqno: seqno,
          secretKey: keyPair.secretKey,
          messages: [
            internal({
              value: '0.0',
              to: destinationAddress,
              bounce: true,
            }),
          ],
          sendMode: sendMode,
        })

        let currentSeqno = await walletContract.getSeqno()
        let counter = 0

        while (currentSeqno === seqno && counter < 21) {
          await sleep(1500)
          currentSeqno = await walletContract.getSeqno()
          counter = counter + 1
        }

        const currentBalance = Number(fromNano(await walletContract.getBalance()))

        if (currentSeqno === seqno + 1 && currentBalance === 0.0) {
          const updatedTx = await updateDepositPendingTx(userAddress, currentSeqno, 'confirmed')
          if (updatedTx?.status === 'confirmed') {
            balanceManager.deposit(userId, roundToTwoDecimals(tonBalanceUSD), 'deposit')
          }
        } else {
          const updatedTx = await updateDepositPendingTx(userAddress, currentSeqno, 'failed')
          if (updatedTx?.status === 'failed') {
            // send back the funds
          }
        }
      }
    }
  }

  // private async _sendJettonTransactionFee(mnemonic: string[], destinationAddress: Address) {
  //   const amount = 0.3

  //   const keyPair = await mnemonicToWalletKey(mnemonic)

  //   const wallet = await WalletContractV5R1.create({
  //     publicKey: keyPair.publicKey,
  //     workchain: 0,
  //   })

  //   const walletContract = this._client.open(wallet)
  //   const seqno = await walletContract.getSeqno()

  //   walletContract.sendTransfer({
  //     seqno: seqno,
  //     secretKey: keyPair.secretKey,
  //     messages: [
  //       internal({
  //         to: destinationAddress,
  //         value: toNano(amount),
  //         bounce: false,
  //       }),
  //     ],
  //     sendMode: SendMode.IGNORE_ERRORS,
  //   })

  //   let destinationBalance = Number(fromNano(await this._client.getBalance(destinationAddress)))
  //   let counter = 0

  //   while (destinationBalance < amount && counter < 21) {
  //     await sleep(1500)
  //     destinationBalance = Number(fromNano(await this._client.getBalance(destinationAddress)))
  //     counter = counter + 1
  //   }
  // }
}

export const tonWalletService = new TONWalletService(
  'https://testnet.toncenter.com/api/v2/jsonRPC',
  'a95a9b756cbff4ec8f338af5c85da959e45cbd038e56e4da9974c5500f2739dc'
)
