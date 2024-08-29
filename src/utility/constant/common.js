export const ErrorConstant = {
  default: 'Something went wrong',
}

export const CommonConstant = {
  mode: process.env.REACT_APP_MODE,
  defaultPageSize: 20,
  noPage: 'no-page',
  noTab: 'no-tab',
  sortDirection: {
    ascending: 'asc',
    descending: 'desc',
  },
  tableSortDirection: {
    ascending: 'ascend',
    descending: 'descend',
  },
  distance: "Miles",
  emailRegex: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const ErrorTypes = {
  NotConfirmed: "UserNotConfirmedException",
  ConfirmSignUp: "CONFIRM_SIGN_UP",
  NotAuthorized: "NotAuthorizedException",
}

export const ViewType = {
  list: 'list',
  grid: 'grid',
}

export const WalletTxTypeKey = {
  walletTopUp: 'walletTopUp',
  walletWithdraw: 'walletWithdraw',
  equity: 'equity',
  debt: 'debt',
  pledged: 'pledged',
  owned: 'owned',
  notSelected: 'notSelected',
  refund: "refund",
  dividend: "dividend",
  waitingList: "waitingList",
  debtDividend: "debtDividend",
  secondaryMarket: "secondaryMarket",
}

export const TxStatusKey = {
  processed: 'processed',
  pending: 'pending',
  cancelled: 'cancelled',
  failed: 'failed',
  created: 'created',
}

export const PaymentType = {
  bankTransfer: "Bank Transfer",
  balance: "Wallet",
}

export const WalletTxType = {
  [WalletTxTypeKey.walletTopUp]: 'Top Up',
  [WalletTxTypeKey.walletWithdraw]: 'Withdraw',
  [WalletTxTypeKey.equity]: 'Equity',
  [WalletTxTypeKey.debt]: 'Debt',
  [WalletTxTypeKey.pledged]: 'Pledged',
  [WalletTxTypeKey.owned]: 'Owned',
  [WalletTxTypeKey.notSelected]: 'Not Selected',
  [WalletTxTypeKey.waitingList]: 'Waiting List',
  [WalletTxTypeKey.debtDividend]: 'Debt Interest',
  [WalletTxTypeKey.dividend]: 'Dividend',
}

export const TransactionTypes = {
  [WalletTxTypeKey.walletTopUp]: 'Top Up',
  [WalletTxTypeKey.walletWithdraw]: 'Withdraw',
  [WalletTxTypeKey.equity]: 'Equity',
  [WalletTxTypeKey.debt]: 'Debt',
  [WalletTxTypeKey.pledged]: 'Pledged',
  [WalletTxTypeKey.dividend]: 'Dividend',
  [WalletTxTypeKey.debtDividend]: 'Debt Divident',
  [WalletTxTypeKey.refund]: 'Refund',
  [WalletTxTypeKey.secondaryMarket]: "Secondary Market",
}

export const AuthStatus = {
  Loading: 'Loading',
  SignedIn: 'SignedIn',
  SignedOut: 'SignedOut',
}

export const KYCStatus = {
  Active: 'active',
  Failed: 'failed',
  Success: 'success',
}

export const StorageConstant = {
  token: 'token',
  user: 'user',
}

export const Roles = {
  admin: 'admins',
  sponsor: 'sponsor',
  investor: 'investor',
}

export const AcceptFileType = {
  image: {
    'image/*': ['.jpeg','.png','.jpg','.gif'],
  },
  application: {
    'application/*': ['.pdf'],
  },
  video: {
    'video/*': [
      '.mp4',
      '.webm',
      '.wav',
      '.mp3',
      '.ogg',
      '.glb',
      '.gltf',
      '.mov',
    ],
  },
  imageVideo: {
    'image/*': [
      '.jpeg',
      '.png',
      '.jpg',
      '.gif',
      '.mp4',
      '.webm',
      '.wav',
      '.mov',
      '.mp3',
      '.ogg',
      '.glb',
      '.gltf',
    ],
  },
}
