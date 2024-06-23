import { useCallback, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Trash, UploadSimple } from 'phosphor-react'
import { PrimaryButton } from 'elements'
import { MediaFiles } from './Documents'
import { CommonUtility } from 'utility'
import { notification } from 'antd'

const KILO_BYTES_PER_BYTE = 1000

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE)

const getDropzoneColor = (props, type) => {
  if (props?.isDragActive) {
    return type === 'border'
      ? `1px solid ${props.theme.colors.grey300}`
      : '#e9e9e9'
  }
  return type === 'border'
    ? `1px dashed ${props.theme.colors.grey300}`
    : props.theme.colors.gray300
}

const DropContainer = styled.div`
  padding: 43.5px 40px;
  transition: border 0.24s ease-in-out;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => getDropzoneColor(props)};
  border: ${(props) => getDropzoneColor(props, 'border')};
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  border: 1px dashed ${({ theme }) => theme.colors.gray300};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  cursor: pointer;
`

const FilePreviewContainer = styled.article`
  max-height: 300px;
  overflow-y: auto;
`

export const FileMetaData = styled.div`
  display: ${(props) => (props.isImageFile ? 'none' : 'flex')};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  span,
  aside {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }

  .icon {
    cursor: pointer;
    &:hover {
      transform: scale(1.3);
    }
  }

  a {
  }
`

const PreviewContainer = styled.div`
  /* padding: 0.25rem; */
`

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`

const ImageContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid;
  height: 180px;
  border-color: ${({ theme }) => theme.colors.gray200};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    height: 120px;
  }

  &:hover {
    opacity: 0.55;
    ${FileMetaData} {
      display: flex;
    }
  }

  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-pdf__Page {
    max-width: calc(100% - 2em);
  }

  .react-pdf__Page__textContent,
  .react-pdf__Page__annotations {
    display: none;
  }

  .react-pdf__Page canvas {
    max-width: 100%;
    height: auto !important;
  }
`

const FileUploadDropContainer = styled(DropContainer)`
  background: transparent !important;
`

const DragText = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0em;
  margin-bottom: 0px;
  font-weight: ${({ theme }) => theme.font.semiBold};
  display: flex;
  span {
    color: ${({ theme }) => theme.colors.gray400};
    font-weight: ${({ theme }) => theme.font.medium};
    margin-left: 4px;
  }
  svg {
    margin-right: 12px;
  }
`

const PreviewFile = ({ file, removeFile }) => {
  const { isImageFile } = useMemo(() => ({
    isImageFile: file.file
      ? CommonUtility.isFileImage(file.file)
      : CommonUtility.isURLImage(file.url),
  }))

  return (
    <PreviewContainer className="mt-2 mt-md-3 col-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
      <ImageContainer>
        {isImageFile && (
          <ImagePreview
            src={file.file ? URL.createObjectURL(file.file) : file.url}
            alt={file.name}
          />
        )}
        <FileMetaData isImageFile={isImageFile}>
          <span>{file.name}</span>
          <aside>
            {file.file && <span>{convertBytesToKB(file.file.size)} kb</span>}
            <Trash className="icon" onClick={(e) => removeFile(e, file)} />
          </aside>
        </FileMetaData>
      </ImageContainer>
    </PreviewContainer>
  )
}

export const PreivewFiles = ({ files, removeFile }) => {
  return (
    <FilePreviewContainer className="row gx-2 gx-md-3">
      {files.map((file) => (
        <PreviewFile
          file={file}
          removeFile={removeFile}
          key={file.name || file.key}
        />
      ))}
    </FilePreviewContainer>
  )
}

export const UploadedFileList = ({ files, removeFile, previewMode }) => {
  return (
    <>
      {files.length > 0 && (
        <>
          {previewMode ? (
            <PreivewFiles files={files} removeFile={removeFile} />
          ) : (
            <MediaFiles files={files} removeFile={removeFile} />
          )}
        </>
      )}
    </>
  )
}

export function FileUploadInput({
  accept,
  maxFiles,
  maxFileSize,
  files,
  setFiles,
  onlyButton,
  previewMode,
  labelText,
  removeURLFile,
  hideFiles,
}) {
  const fileInputRef = useRef()

  const addNewFiles = (newFiles) => {
    if ((maxFiles || 0) === 1) {
      if (!maxFileSize || newFiles[0].size / 1048576 <= maxFileSize) {
        setFiles([
          {
            name: newFiles[0].name,
            file: newFiles[0],
          },
        ])
      } else {
        notification.info({
          message: `Upload file less than ${maxFileSize} MB`,
        })
      }
    } else {
      const temp = []
      let hasMaxSize = false
      newFiles.forEach((file) => {
        if (!maxFileSize || file.size / 1048576 <= maxFileSize) {
          // in MB
          if (!maxFiles || files.length < maxFiles) {
            temp.push({
              name: file.name,
              file,
            })
          }
        } else {
          hasMaxSize = true
        }
      })
      setFiles((x) => [...x, ...temp])
      if (hasMaxSize) {
        notification.info({
          message: `Upload file less than ${maxFileSize} MB`,
        })
      }
    }
    fileInputRef.current.getElementsByTagName('input')[0].value = null
  }

  const onDrop = useCallback((acceptedFiles) => {
    addNewFiles(acceptedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept,
    maxFiles,
    multiple: !maxFiles || maxFiles > 1,
    noClick: onlyButton,
    noKeyboard: onlyButton,
    onDrop,
  })

  const removeFile = (e, file) => {
    e.preventDefault()
    e.stopPropagation()
    if (file.file) {
      setFiles(files.filter((x) => x.name !== file.name))
    } else {
      removeURLFile(file)
    }
  }

  return (
    <>
      {labelText && <label>{labelText}</label>}
      {onlyButton ? (
        <div {...getRootProps({})} ref={fileInputRef}>
          <input {...getInputProps()} />
          <PrimaryButton
            bgprimarylight={1}
            fontsmall={1}
            heightxsmall={1}
            onClick={open}
          >
            Upload
          </PrimaryButton>
        </div>
      ) : (
        <FileUploadDropContainer
          {...getRootProps({
            isDragActive,
            isDragAccept,
            isDragReject,
          })}
          ref={fileInputRef}
        >
          <input {...getInputProps()} />
          <DragText>
            <UploadSimple size={16} weight="bold" />
            Choose a file <span>or drag it here.</span>
          </DragText>
        </FileUploadDropContainer>
      )}
      {!hideFiles && (
        <UploadedFileList
          files={files || []}
          removeFile={removeFile}
          previewMode={previewMode}
        />
      )}
    </>
  )
}
