import React,{ useState } from 'react';
import { ShareNetwork } from 'phosphor-react';
import { Tooltip } from 'antd';

export function TextCopyToClipboard({
  text,
}) {
  const [isCopied,setIsCopied] = useState(false);

  async function copyTextToClipboard() {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy',true,text);
  }

  const handleCopyClick = async (e) => {

    e.stopPropagation();
    e.preventDefault();
    await copyTextToClipboard()
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    },1500);
  };

  return (
    <Tooltip title={isCopied ? "Copied" : "Copy"}>
      <ShareNetwork size={24} onClick={handleCopyClick} />
    </Tooltip>
  );
}