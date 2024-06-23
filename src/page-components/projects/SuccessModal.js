import { CustomModal } from 'components'
import { PrimaryButton } from 'elements'
import styled from 'styled-components'
import { Images } from 'images'
import { useEffect,useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'

const IconBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  >div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const Icon = styled.img`
  width: 104px;
`

export const SuccessModal = ({
  open,
  className,
  title,
  description,
  btnText,
  onBtnClick,
}) => {
  const [isExploding,setIsExploding] = useState(false)

  useEffect(() => {
    setIsExploding(open)
  },[open])

  return (
    <>
      <CustomModal
        wrapClassName={className}
        width={416}
        open={open}
        onCancel={() => onBtnClick()}
        closeIcon={false}
        footer={false}
      >
        <IconBlock className="mb-4">
          <Icon src={Images.successIcon} />
          {isExploding && (
            <ConfettiExplosion
              zIndex={10000}
              duration={3000}
              particleCount={150}
            />
          )}
        </IconBlock>
        {title && <h4>{title}</h4>}
        {description && <p>{description}</p>}
        {btnText && (
          <div className="d-flex justify-content-center">
            <PrimaryButton
              className="ps-4 pe-4"
              semibold={1}
              onClick={() => onBtnClick(true)}
            >
              {btnText}
            </PrimaryButton>
          </div>
        )}
      </CustomModal>
    </>
  )
}
