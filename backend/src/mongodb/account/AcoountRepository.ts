import { tonWalletService } from '../../funds/service/TONWalletService'
import Account, { IAccount } from './AccountModel'

export async function getAllAccounts(): Promise<IAccount[]> {
  return Account.find()
}

export async function getAccountById(id: string): Promise<IAccount | null> {
  return Account.findOne({ id: id })
}

export async function updateAccountBalanceById(id: string, amount: number): Promise<IAccount | null> {
  const updatedAccount = await Account.findOneAndUpdate({ id: id }, { $inc: { balance: amount } }, { new: true })

  if (updatedAccount) {
    updatedAccount.balance = Math.round((updatedAccount.balance + Number.EPSILON) * 100) / 100
    await updatedAccount.save() // сохраняем округлённый результат
  }

  return updatedAccount
}

export async function updateAccountFreeBalanceById(id: string, amount: number): Promise<IAccount | null> {
  const updatedAccount = await Account.findOneAndUpdate({ id: id }, { $inc: { freeBalance: amount } }, { new: true })

  if (updatedAccount) {
    updatedAccount.freeBalance = Math.round((updatedAccount.freeBalance + Number.EPSILON) * 100) / 100
    await updatedAccount.save() // сохраняем округлённый результат
  }

  return updatedAccount
}

export async function createAccount(id: string, name: string, username: string): Promise<IAccount> {
  const tonWallet = await tonWalletService.generateWallet()
  const tonMnemonic = tonWallet.mnemonic
  const tonAddress = tonWallet.wallet.address.toString({
    bounceable: false,
    testOnly: true,
    urlSafe: true,
  })

  return new Account({
    id: id,
    name: name,
    username: username,
    balance: 0.0,
    freeBalance: 10000,
    tonMnemonic: tonMnemonic,
    tonAddress: tonAddress,
  }).save()
}

export async function deleteAccount(id: string): Promise<IAccount | null> {
  return Account.findByIdAndDelete({ id: id })
}

// export async function updateOldDocuments() {
//   const accounts = await Account.find({})

//   for (const account of accounts) {
//     const wallet = await tonWalletService.generateWallet()
//     account.tonMnemonic = wallet.mnemonic
//     account.tonAddress = wallet.wallet.address.toString()
//     await account.save()
//   }
// }
