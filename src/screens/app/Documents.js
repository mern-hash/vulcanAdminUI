import { PageHeader } from 'components'
import { Title } from 'elements'
import { Folder } from 'phosphor-react'
import styled from 'styled-components'

const folders = [
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
];

const files = [
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
  {
    name: 'Web',
    type: 'folder',
  },
]

const FolderItem = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray100};
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  justify-content: space-between;
`

const FileItem = styled.div`
  background: ${({ theme }) => theme.colors.gray100};
  padding: 8px 16px;
  border-radius: 8px;
  img {
    border-radius: 8px;
  }
  margin-bottom: 16px;
`

export const DocumentsScreen = () => {
  return (
    <div className="container">
      <PageHeader left={<Title>Documents</Title>} />

      <div>
        <div className="row">
          <p>Folders</p>
          {folders.map((f) => (
            <ProjectFolder name={f.name} />
          ))}
        </div>
        <div className="row">
          <p>Files</p>
          {files.map((f) => (
            <ProjectFile name={f.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ProjectFile = ({ name }) => {
  return (
    <div className="col-lg-3">
      <div>
        <div>
        <FileItem key={name}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <Folder size={32} weight="fill" />
              &nbsp;
              {name}
            </div>
          </div>
          <img src="http://via.placeholder.com/300" alt="Files" />
        </FileItem>
        </div>
      </div>
    </div>
  )
}

const ProjectFolder = ({ name }) => {
  return (
    <div className="col-lg-3">
      <FolderItem key={name}>
        <div className="d-flex align-items-center">
          <Folder size={32} weight="fill" />
          &nbsp;
          {name}
        </div>
      </FolderItem>
    </div>
  )
}