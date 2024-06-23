import { File,XCircle } from "phosphor-react";
import styled from "styled-components";
import { CommonUtility } from "utility";

const MediaContainer = styled.div`
	margin: 1rem auto ;
`

const MediaBlock = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 11px 16px;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    display: flex;

    + div{
        margin-top: 8px;
    }
`
const LeftBlock = styled.div`
    width: 32px;
    display: flex;
    align-items: center;

    svg{
        color: ${({ theme }) => theme.colors.gray600};
    }
`

const RightBLock = styled.div`
    width: calc(100% - 32px);
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
`

const Title = styled.h6`
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray800};
    margin-bottom: 4px;
    line-height: normal;
`

const Description = styled.p`
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.para12};
    line-height: 15px;
    margin-bottom: 0px;
`

const SvgBLock = styled.span`
    position: absolute;
    top: 50%;
    right: 0px;
    display: flex;
    margin-top: -12px;
    cursor: pointer;

    svg{
        color: ${({ theme }) => theme.colors.gray400};
    }

    &:hover{
        svg{
            color: ${({ theme }) => theme.colors.gray800};
        }
    }
`

export function MediaFile({ name,size,removeFile }) {
	return (
		<MediaBlock>
			<LeftBlock>
				<File size={32} weight="light" />
			</LeftBlock>
			<RightBLock>
				<Title>{name}</Title>
				{size && <Description>{CommonUtility.formatBytes(size)}</Description>}
				<SvgBLock>
					<XCircle size={24} weight="fill" onClick={removeFile} />
				</SvgBLock>
			</RightBLock>
		</MediaBlock>
	)
}

export function MediaFiles({ files,removeFile }) {
	return (
		<MediaContainer>
			{files.map(file => <MediaFile
				key={file.name || file.key}
				name={file.name || (file.url || "").substring(file.url.lastIndexOf('/') + 1)}
				size={file.file?.size}
				removeFile={(e) => removeFile(e,file)}
			/>)}
		</MediaContainer>
	)
}