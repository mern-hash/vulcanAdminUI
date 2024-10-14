export const AssetTypes = [
  {
    value: 'Offices',
    label: 'Offices',
  },
  {
    value: 'Apartments',
    label: 'Apartments',
  },
  {
    value: 'Data Center',
    label: 'Data Center',
  },
]

export const OfferingType = {
  equity: 'EQUITY',
  debt: 'DEBT',
  both: 'BOTH',
  debtRisk: 'DEBTRISK',
}

export const OfferingTypes = [
  {
    value: OfferingType.equity,
    label: 'Equity',
  },
  {
    value: OfferingType.debt,
    label: 'Debts',
  },
  {
    value: OfferingType.both,
    label: 'Both',
  },
   {
    value: OfferingType.debtRisk,
    label: 'Debt With Risk',
  },
]

export const SecondaryOfferingTypes = [
  {
    value: OfferingType.equity,
    label: 'Equity',
  },
  {
    value: OfferingType.debt,
    label: 'Debts',
  },
  {
    value: OfferingType.both,
    label: 'Both',
  },
]

export const ProjectTypes = [
  {
    value: 'PURSUIT',
    label: 'Pursuit',
  },
  {
    value: 'DEVELOPMENT',
    label: 'Development',
  },
  {
    value: 'STABILIZED',
    label: 'Stablized',
  },
]

export const DevelopmentStages = [
  {
    value: 'site-preparation',
    label: 'Site Preparation',
  },
  {
    value: 'foundation',
    label: 'Foundation',
  },
  {
    value: 'framing',
    label: 'Framing',
  },
  {
    value: 'roofing',
    label: 'Roofing',
  },
  {
    value: 'fixtures-finishes',
    label: 'Fixtures and Finishes',
  },
  {
    value: 'final-inspection',
    label: 'Final Inspection',
  },
]

export const LeedCertificates = [
  {
    value: 'gold',
    label: 'Gold',
  },
  {
    value: 'platinum',
    label: 'Platinum',
  },
  {
    value: 'silver',
    label: 'Silver',
  },
]

export const ProjectStatus = {
  approved: 'APPROVED',
  retured: 'RETURED',
  pending: 'PENDING',
  disapproved: 'DISAPPROVED',
  closed: 'CLOSED',
  active: 'ACTIVE',
  reevaluate: 'REEVALUATE',
  upcoming: 'UPCOMING',
  processed: 'PROCESSED',
  failed: 'FAILED',
  cancelled: 'CANCELLED',
  refunded: "REFUNDED",
}

export const CapitalCallStatus = {
  approved: 'approved',
  rejected: 'rejected',
  requested: 'requested',
}

export const CapitalCallStatusColor = {
  rejected: '#B00020',
  approved: '#71C68D',
  requested: '#88B1BE',
  ended: '#e15654',
}

export const ProjectFilters = {
  all: 'All',
  pending: 'Pending',
  capital: 'Requested Capital Call',
}

export const ProjectStausColor = {
  retured: '#A1A1AA',
  pending: '#BAA5C5',
  closed: '#FDA0AF',
  active: '#71C68D',
  approved: '#71C68D',
  disapproved: '#FDA0AF',
  reevaluate: '#A1A1AA',
  upcoming: '#88B1BE',
  processed: '#88B1BE',
  failed: '#B00020',
  cancelled: '#FDA0AF',
  created: '#71717A',
  refunded: '#A1A1AA',
}

export const DropdownStatus = [
  { value: "PENDING",label: "Pending" },
  { value: "CLOSED",label: "Closed" },
  { value: "ACTIVE",label: "Active" },
  { value: "UPCOMING",label: "Upcoming" },
  // { value: "MARK_FOR_ADMIN_APPROVAL",label: "Mark for Admin Approval" },
  // { value: "WAITING_ADMIN_APPROVAL",label: "Waiting Admin Approval" },
]