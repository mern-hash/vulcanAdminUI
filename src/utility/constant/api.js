const basePath = process.env.REACT_APP_API_PATH
export const APIPath = {
  server: `${basePath}/api`,

  // Projects
  projects: 'project',
  allProjects: 'project/find-all',
  findProject: 'project/find-one',
  findProjectPublic: 'project/public/find-one',
  searchProject: 'project/search-public',
  createProject: 'project/create',
  projectsApproved: 'project/find-all-approved',
  projectsWithTab: 'project/find-all-tabs',
  projectsUnApproved: 'project/find-all-unapproved',
  transactions: 'project-transactions/get-all-transactions',
  investorTransactions: 'project-transactions/get-all-transactions-grouped-by-investor',
  investmentPortfolio: 'project-transactions/investment-portfolio',
  walletData: 'project-transactions/get-all-logged-in-user-transactions-grouped-by-project',
  myTransactions: 'project-transactions/get-all-logged-in-user-transactions',
  projectWithFilterProps: '/project/get-distinct-project-props-for-filter',
  projectToggleHidden: 'project/hide',
  projectUserKYCInfo: 'project/kyc/info',
  dividends: 'project-transactions/distribute-profits',
  payRemainingDues: 'project-transactions/pay-equity-pledge-remaining-amount',
  refund: 'project-transactions/refund',
  investorCSV: 'project/investors/as/csv',
  transactionCSV: 'project/transactions/as/csv',
  refundProject: 'project-transactions/refund/project',

  // Users
  users: 'users',
  userChangeEmail: 'users/change-email',
  currentUserStep: 'users/logged-in/data',
  updateProfile: 'users/logged-in/update-profile',
  addFavouriteProject: 'users/add-favorite-project',
  removeFavouriteProject: 'users/remove-favorite-project',
  userWallet: 'users/logged-in/wallet/transfers',
  walletOverview: 'users/logged-in/wallet/balance',
  walletAddFund: 'users/logged-in/wallet/add-funds',
  walletWithdrawFund: 'users/logged-in/wallet/withdraw-funds',
  lastActiveDate: "users/logged-in/last-active-date",
  registerSponsor: 'users/register-sponsor',
  availablePledgeQuantity: 'users/available-pledge-quantity',
  myShares: "users/get-all-logged-in-user-shares-data",

  // Plaid
  plaidCreateLinkToken: 'plaid/create_link_token',
  plaidCreateKYCLinkToken: 'plaid/create_link_token/for-identity-verification',
  plaidExchangeLinkToken: 'plaid/exchange_public_token',
  plaidKYCReset: 'plaid/kyc-reset',

  // Settings
  settings: 'settings',

  // Upload Files
  getSignedURL: 'aws/request-upload-url',

  // Health
  health: 'health',
  healthLogs: 'health/logs',

  // Secondary Marketplace
  secondaryMarketsSellList: "secondary-markets-sell-listing/paginated",
  secondaryMarketsSellCreate: "secondary-markets-sell-listing/create",
  secondaryMarketsSell: "secondary-markets-sell-listing",

  secondaryMarketsBuyList: "secondary-markets-buy-listing/paginated",
  secondaryMarketsBuyCreate: "secondary-markets-buy-listing/create",
  secondaryMarketsBuy: "secondary-markets-buy-listing",

}
