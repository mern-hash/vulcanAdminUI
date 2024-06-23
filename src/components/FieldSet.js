import React from 'react';
import styled from 'styled-components';

const CustomFieldSet = styled.div`
    background: var(--Base-White, #FFF);
    box-shadow: 0px 1px 0px 0px #E7E8E9;
    border: 1px solid var(--Grey-200, #E4E4E7);
    border-radius: 8px;
`

const Title = styled.div`
    padding: 12px 16px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid var(--Grey-200, #E4E4E7);
    background: var(--Grey-100, #F4F4F5);
    font-size: 14px;
    text-transform: uppercase;
`

const FieldSet = ({ labelText, children }) => {
  return (
    <CustomFieldSet>
      <Title>{labelText}</Title>
      {children}
    </CustomFieldSet>
  );
};

export default FieldSet;
