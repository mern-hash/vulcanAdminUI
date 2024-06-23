import { BorderWithShadow } from 'components'
import { DevelopmentBlock } from './DevelopmentBlock'

export const OfferingDescription = ({
  description,
  status,
  sponsor,
  sponsorId,
  sponsorBio,
}) => {
  return (
    <BorderWithShadow bordernone={1}>
      <h6 className="medium mb-2">Description</h6>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <DevelopmentBlock
        status={status}
        sponsor={sponsor}
        sponsorId={sponsorId}
        sponsorBio={sponsorBio}
      />
    </BorderWithShadow>
  )
}
