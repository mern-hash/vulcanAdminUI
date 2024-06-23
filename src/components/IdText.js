import React, { useState } from 'react'
import { Tooltip } from 'antd'
import { Copy } from 'phosphor-react'
import { AlignCenterFlexRow } from './Common'
import styled from 'styled-components'

const CopyButton = styled(Copy)`
  opacity: 0;
`

const CopyBox = styled(AlignCenterFlexRow)`
  &:hover {
    ${CopyButton} {
      opacity: 1;
    }
  }
`

export function IDText({ id }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyTextToClipboard() {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(id)
    }
    return document.execCommand('copy', true, id)
  }

  const handleCopyClick = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    await copyTextToClipboard()
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <CopyBox>
      {(id || '').slice(0, 8).replace(/\D/g, '')}
      <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
        <CopyButton onClick={handleCopyClick} />
      </Tooltip>
    </CopyBox>
  )
}
