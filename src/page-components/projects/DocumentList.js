import { BorderWithShadow } from 'components'
import { DesktopMode, MobileMode } from 'layout/responsive-media'
import {
  File,
  FilePdf,
  FileXls,
  FileDoc,
  FileImage,
  CaretDown,
} from 'phosphor-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { theme } from 'utility'

const ParaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.8;
  margin-bottom: 16px;
`

const DetailsSpecBlock = styled.div`
  + div {
    margin-top: 48px;
  }
`
const DetailsSpecIcon = styled.span`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary50};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 16px;
`
const DetailsSpecTitle = styled.h1`
  font-size: 28px;
  display: flex;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1365px) {
    font-size: 24px;
  }

  @media screen and (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`

const DocIconBlock = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
`

const DocumentList = styled.ul`
  list-style: none;
  border: 1px solid #e7e8e9;
  border-radius: 8px;
  box-shadow: 0px 4px 4px -2px rgba(24, 39, 75, 0.04);

  li {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray800};
    line-height: 1.5;
    padding: 14px 16px;
    display: flex;
    + li {
      border-top: 1px solid #e7e8e9;
    }

    svg {
      margin-right: 8px;
    }
  }
`

const CaretDownBLock = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RenderIcon = ({ fileType }) => {
  switch (fileType) {
    case 'pdf':
      return <FilePdf size={20} weight="fill" color={theme.colors.colorRed} />
    case 'xls':
      return <FileXls size={20} weight="fill" color={theme.colors.colorGreen} />
    case 'docx':
      return <FileDoc size={20} weight="fill" />
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
      return <FileImage size={20} weight="fill" />
    default:
      return <File size={20} weight="fill" />
  }
}

const RenderDocument = ({ document }) => {
  const { ext } = useMemo(() => ({
    ext: document.url.split('.').pop(),
  }))
  return (
    <li className="pdf-file">
      <a href={document.url} target="_blank" rel="noreferrer">
        <RenderIcon fileType={ext} />
        {document.description}
      </a>
    </li>
  )
}

export const ProjectDocumentList = ({ documents }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="documents" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <File size={24} />
            </DetailsSpecIcon>
            Documents
          </DetailsSpecTitle>
          {documents.length === 0 ? (
            <BorderWithShadow spacebig={1} big={1} className="mb-4">
              <DocIconBlock>
                <File size={24} />
              </DocIconBlock>
              <h6 className="mb-1 text-center color-gray700">Not Available</h6>
              <ParaText className="mb-0 text-center color-gray-500">
                Documents are not applicable for this asset
              </ParaText>
            </BorderWithShadow>
          ) : (
            <DocumentList className="m-0 p-0">
              {documents.map((item) => (
                <RenderDocument document={item} key={item._id} />
              ))}
            </DocumentList>
          )}
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="documents" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <File size={24} />
            </DetailsSpecIcon>
            Documents
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && (
            <>
              {documents.length === 0 ? (
                <BorderWithShadow spacebig={1} big={1} className="mb-4">
                  <DocIconBlock>
                    <File size={24} />
                  </DocIconBlock>
                  <h6 className="mb-1 text-center color-gray700">
                    Not Available
                  </h6>
                  <ParaText className="mb-0 text-center color-gray-500">
                    Documents are not applicable for this asset
                  </ParaText>
                </BorderWithShadow>
              ) : (
                <DocumentList className="m-0 p-0">
                  {documents.map((item) => (
                    <RenderDocument document={item} key={item._id} />
                  ))}
                </DocumentList>
              )}
            </>
          )}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
