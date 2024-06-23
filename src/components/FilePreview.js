import { Image, Modal } from 'antd';
import { CommonUtility } from 'utility';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'

const PdfPreviewer = styled.iframe`
    width:100%;
    height:500px;
`

export const VideoPreview = ({ url,file }) => {
    return (
        <ReactPlayer
            url={url}
            playsinline
            playing
            controls
            muted
            width="100%"
            config={{
                file: {
                    attributes: {
                        poster: file?.url,
                    },
                },
            }} />
    )
}

export const FilePreview = ({ url, onClose, title }) => {

    const isImage = CommonUtility.isURLImage(url || "")
    const isVideo = CommonUtility.isURLVideo(url || "")
    const isFile = CommonUtility.isURLFile(url || "")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!isImage && !!url) {
            setOpen(!!url)
        }
    }, [url])

    const modalClose = () => {
        setOpen(false)
        onClose()
    }

    return (
        <>
            {isImage && <Image
                width={200}
                style={{ display: 'none' }}
                preview={{
                    visible: !!url,
                    src: url,
                    onVisibleChange: (value) => {
                        onClose(value);
                    },
                }}
            />}
            <Modal title={title} open={open} footer={null} onCancel={modalClose}>
                {isVideo && <VideoPreview url={url} />}
                {isFile && <PdfPreviewer title="file" src={url} />}
            </Modal>
        </>)
}