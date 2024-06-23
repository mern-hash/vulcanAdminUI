import { CustomModal, CustomValueName, InfoWrapper } from 'components'
import { X } from 'phosphor-react'
import {
  CommonUtility,
  PaymentType,
  WalletTxType,
  WalletTxTypeKey,
} from 'utility'

export const TransactionDetailsModal = ({ open, closeModal, data }) => {
  return (
    <CustomModal
      width={526}
      open={open}
      title="Transaction Details"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={null}
    >
      <div className="row g-3">
        <div className="col col-12">
          <InfoWrapper>
            <div className="row">
              <div className="col col-5">
                <CustomValueName
                  common="mb-4 reverse"
                  name={WalletTxType[data?.type]}
                  value="Share Type:"
                />

                <CustomValueName
                  common="mb-4 reverse"
                  name={
                    CommonUtility.currencyFormat(
                      data?.equityPledge?.investmentPrice ||
                        data?.debtPledge?.investmentPrice,
                    ) || '-'
                  }
                  value="Investment Price:"
                />
                {data?.type === WalletTxTypeKey.equity && (
                  <>
                    <CustomValueName
                      common="mb-4 reverse"
                      name={`${CommonUtility.numberWithCommas(
                        data?.equityPledge?.percentage || 0,
                      )}%`}
                      value="Payment Percentage:"
                    />
                    <CustomValueName
                      common="mb-4 reverse"
                      name={
                        CommonUtility.currencyFormat(
                          data?.equityPledge?.paid,
                        ) || '-'
                      }
                      value="Paid:"
                    />
                  </>
                )}
                {data?.type === WalletTxTypeKey.debt && (
                  <>
                    <CustomValueName
                      common="mb-4 reverse"
                      name={`${CommonUtility.numberWithCommas(
                        data?.debtPledge?.interestRate || 0,
                      )}%`}
                      value="Interest Rate:"
                    />
                  </>
                )}
                <CustomValueName
                  common="mb-4 reverse"
                  name={PaymentType[data?.paymentMethod] || '-'}
                  value="Payment Method:"
                />
              </div>
              <div className="col col-5 ps-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.toTitleCase(data?.status) || '-'}
                  value="Status:"
                />
                <CustomValueName
                  common="mb-4 reverse"
                  name={
                    CommonUtility.numberWithCommas(
                      data?.equityPledge?.tokenCount ||
                        data?.debtPledge?.tokenCount,
                    ) || '-'
                  }
                  value="Share Count:"
                />
                <CustomValueName
                  common="mb-4 reverse"
                  name={
                    WalletTxType[
                      data?.equityPledge?.shareStatus ||
                        data?.debtPledge?.shareStatus
                    ] || '-'
                  }
                  value="Share Status:"
                />
                {data?.type === WalletTxTypeKey.equity && (
                  <CustomValueName
                    common="mb-4 reverse"
                    name={
                      CommonUtility.currencyFormat(
                        data?.equityPledge?.remaining,
                      ) || '-'
                    }
                    value="Remaining:"
                  />
                )}
              </div>
            </div>
          </InfoWrapper>
        </div>
      </div>
    </CustomModal>
  )
}
