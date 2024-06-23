import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    @font-face {
    font-family: 'Inter';
    src: url('../fonts/Inter-Medium.eot');
    src: url('../fonts/Inter-Medium.eot?#iefix') format('embedded-opentype'),
        url('../fonts/Inter-Medium.woff2') format('woff2'),
        url('../fonts/Inter-Medium.woff') format('woff'),
        url('../fonts/Inter-Medium.ttf') format('truetype'),
        url('../fonts/Inter-Medium.svg#Inter-Medium') format('svg');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: 'Inter';
    src: url('../fonts/Inter-Regular.eot');
    src: url('../fonts/Inter-Regular.eot?#iefix') format('embedded-opentype'),
        url('../fonts/Inter-Regular.woff2') format('woff2'),
        url('../fonts/Inter-Regular.woff') format('woff'),
        url('../fonts/Inter-Regular.ttf') format('truetype'),
        url('../fonts/Inter-Regular.svg#Inter-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: 'Inter';
    src: url('../fonts/Inter-Bold.eot');
    src: url('../fonts/Inter-Bold.eot?#iefix') format('embedded-opentype'),
        url('../fonts/Inter-Bold.woff2') format('woff2'),
        url('../fonts/Inter-Bold.woff') format('woff'),
        url('../fonts/Inter-Bold.ttf') format('truetype'),
        url('../fonts/Inter-Bold.svg#Inter-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: 'Inter';
    src: url('../fonts/Inter-SemiBold.eot');
    src: url('../fonts/Inter-SemiBold.eot?#iefix') format('embedded-opentype'),
        url('../fonts/Inter-SemiBold.woff2') format('woff2'),
        url('../fonts/Inter-SemiBold.woff') format('woff'),
        url('../fonts/Inter-SemiBold.ttf') format('truetype'),
        url('../fonts/Inter-SemiBold.svg#Inter-SemiBold') format('svg');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    }

  * {
    font-family: 'Inter', sans-serif !important;
  }

  body,
  html{
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }  

  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .float-right{
    float : right;
  }
  
  .text-right{
    text-align : right;
  }

  .text-center{
    text-align : center;
  }

  .ql-editor{
    min-height: 300px !important;
    max-height: 400px;
    overflow: auto;
  }

  // Label Style

  label{
    color: ${({ theme }) => theme.colors.gray800} !important;
    font-weight: ${({ theme }) => theme.font.medium} !important;
    padding-bottom: 12px;
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.para14};
    line-height: 17px; 
  }

  input{
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

    h1, 
    h2, 
    h3, 
    h4, 
    h5, 
    h6 { 
        margin:  0 0 20px 0; font-family: $body-font; font-weight: 700; color: $head-color;
    }

    h1, .h1 { 
        font-size: ${({ theme }) => theme.fontSize.h1};

        @media screen and (max-width: 1023px) {
          font-size: 26px;
        }
    }
    h2, .h2 {
        font-size: ${({ theme }) => theme.fontSize.h2};
    }
    h3, .h3 {
        font-size: ${({ theme }) => theme.fontSize.h3};
    }
    h4, .h4 {
        font-size: ${({ theme }) => theme.fontSize.h4};
    }
    h5, .h5 {
        font-size: ${({ theme }) => theme.fontSize.h5};
    }
    h6, .h6 { 
        font-size: ${({ theme }) => theme.fontSize.h6}; 
    }
    .font-20{
      font-size: 20px;
    }
    p { 
        font-size: ${({ theme }) => theme.fontSize.para16};
        line-height: 1.5; 
        margin: 0 0 20px 0;

        @media screen and (max-width: 767px) {
          font-size: ${({ theme }) => theme.fontSize.para14};
          line-height: 1.8; 
          margin: 0 0 16px 0;
        }

        &.small{
          font-size: ${({ theme }) => theme.fontSize.para14};
        }
    }

    ul, ol{
        margin-left:0px;
        padding-left: 16px;
        margin-top: 0px;

        li{
          color: ${({ theme }) => theme.colors.gray900};
          line-height: 1.8;
        }
    }

    a, .ant-typography{
        color: ${({ theme }) => theme.colors.gray700};

        &:hover{
            color: ${({ theme }) => theme.colors.primary400};
        }
    }

    .link-underline{
      color: ${({ theme }) => theme.colors.primary500};
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: ${({ theme }) =>
        theme.colors.primary500} !important;
    }


    // ========== Common Class ========== //

    .ps-5{
      padding-left: 32px !important;
    }
    .pe-5{
      padding-right: 32px !important;
    }

    img{
      max-width: 100%;
      max-height: 100%;
      display: inline-block;
    }

    .height-100{
      height: 100% !important;
    }

    .container{
        max-width: 100%;
        padding: 0px;
    }

    .list-style-none{
        list-style-type: none;
        padding-left: 0px;
    }

    .icon{
      display: inline-block;
      vertical-align: middle;

      svg{
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }

    .m-b-none{
        margin-bottom: 0px !important;
    }

    .ml-8{
      margin-left: 8px;
    }

    .ml-16{
      margin-left: 16px;
    }

    .mb-32{
      margin-bottom: 32px;
    }

    .mt-32{
      margin-top: 32px;
    }

    .page-heading{
        font-size: ${({ theme }) => theme.fontSize.h4};
        margin-bottom: 24px;
        font-weight: ${({ theme }) => theme.font.medium};
    }

    .mobile-hide{
      @media screen and (max-width: 767px) {
        display: none !important;
      }
    }

    .desktop-hide{
      display: none !important;
      @media screen and (max-width: 767px) {
        display: block !important;
      }
    }

    .medium-show{
      display: none !important;
      @media screen and (max-width: 1279px) {
        display: block !important;
      }
    }

    .medium-hide{
      @media screen and (max-width: 1279px) {
        display: none !important;
      }
    }

    .tablet-hide{
      @media screen and (max-width: 1023px) {
        display: none;
      }
    }
    .tablet-show{
      display: none !important;
      @media screen and (max-width: 1023px) {
        display: block !important;
      }
    }

    // ========== Ant globle style ========== //

    .ant-row{
        line-height: normal;
    }

    .ant-form-item-label{
      padding-bottom: 0px !important;
    }

    // Ant Dropdown Style

    .ant-picker-dropdown{
      .ant-picker-cell-in-view{
        &.ant-picker-cell-today{
          .ant-picker-cell-inner{
            &::before{
              border-color: ${({ theme }) => theme.colors.primary400};
            }
          }
        } 
      }

      .ant-picker-today-btn{
        color: ${({ theme }) => theme.colors.primary400};

        &:hover{
          color: ${({ theme }) => theme.colors.primary500};
        }
      }
    }

    // Ant Modal Style

    .success-modal{
        .ant-modal-content{
            background: linear-gradient(180deg, rgba(244, 251, 246, 0.70) 0%, rgba(244, 251, 246, 0.00) 49.48%), #FFF;
        }
        .ant-modal-body{
            padding: 40px;
            text-align: center;
        }
        h4{
          font-weight: ${({ theme }) => theme.font.medium};
          margin-bottom: 8px;
          line-height: normal;
        }
        p{
          line-height: 1.7;
          color: ${({ theme }) => theme.colors.gray600};
          margin-bottom: 24px;
          font-size: ${({ theme }) => theme.fontSize.para14};
          line-height: 1.7;
        }
    }

    // Ant Tooltip Style

    .ant-tooltip{
      .ant-tooltip-arrow{
        &:before, &:after{
          background-color: ${({ theme }) => theme.colors.gray600} !important;
        }
      }
    }

    .ant-tooltip-inner{
      background-color: ${({ theme }) => theme.colors.gray600} !important;
      padding: 16px !important;
      border-radius: 8px !important;
    }

    .tooltip-big{
      max-width: 432px;
    }

    // Ant Segmented Style

    .ant-segmented{
      background: none !important;
      padding: 0px !important;

      .ant-segmented-item{
        border: 1px solid ${({ theme }) => theme.colors.gray200};
        height: 40px;
        padding: 0;
        box-shadow: none;
        border-radius: 0px;
        color: ${({ theme }) => theme.colors.gray500} !important;

        &:first-child{
          border-start-start-radius: 8px;
          border-end-start-radius: 8px;
        }
        &:last-child{
          border-start-end-radius: 8px;
          border-end-end-radius: 8px;
        }

        + .ant-segmented-item{
          border-left: 0px;

          &.ant-segmented-item-selected{
            position: relative;

            &:after{
              width: 1px;
              height: 100%;
              position: absolute;
              content: "";
              background-color: ${({ theme }) => theme.colors.primary200};
              top: 0;
              left: -1px;
            }
          }
        }

        .ant-segmented-item-label{
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 16px;
        }
        .ant-segmented-item-icon{
          display: flex;
          align-items: center;
        }

        &.ant-segmented-item-selected{
          background-color: ${({ theme }) => theme.colors.primary100};
          border-color: ${({ theme }) => theme.colors.primary200};
          color: ${({ theme }) => theme.colors.primary700} !important;
        }
      }
    }
    .bt {
      border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    }
    .bb {
      border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    }

    .ant-layout-sider-collapsed{
      + .ant-layout{
        .ant-layout-footer{
          > div {
            padding-left: 82px; 
            padding-right: 162px;
          }
        }
      }
    }

    .ant-tooltip-content{
      .ant-tooltip-inner{
        font-size: ${({ theme }) => theme.fontSize.para12};
        padding: 12px !important;
      }
    }

    .cursor-pointer{
      cursor: pointer;
    }
        
    .login-footer-block{
        p{
            @media screen and (max-width: 767px) {
                max-width: 190px;
                margin: 0 auto;
            }
        }
    }

    .ant-pagination{
      display: flex;
      flex-wrap: wrap;
      row-gap: 8px;
      justify-content: flex-end;
      margin: 16px 0;
      li {
        height: 37px !important;
        line-height: 37px !important;
        padding: 5px 8px;
        background: ${({ theme }) => theme.colors.gray100};
        display: flex !important;
        align-items: center;
        margin-right: 8px !important;
        border-radius: ${({ theme }) => theme.borderRadius.border8} !important;

        a{
          color: ${({ theme }) => theme.colors.gray600};
          font-size: ${({ theme }) => theme.fontSize.para14};
          font-weight: ${({ theme }) => theme.font.medium};
        }

        &:last-child{
          margin-right: 0px !important;
        }

        &.ant-pagination-prev, &.ant-pagination-next{
          padding-right: 14px;
          padding-left: 14px;
        }

        &.ant-pagination-item-active, &:hover{
          background: ${({ theme }) => theme.colors.primary400} !important;
          border-color: ${({ theme }) => theme.colors.primary400};

          a{
            color: ${({ theme }) => theme.colors.colorWhite};
          }

          &:hover{
            border-color: ${({ theme }) => theme.colors.primary400};

            a{
              color: ${({ theme }) => theme.colors.colorWhite};
            }
          }
        }

        &:hover{
          border-color: ${({ theme }) => theme.colors.primary400};
        }

        &.ant-pagination-disabled{
          opacity: 0.5;

          &:hover{
            background: ${({ theme }) => theme.colors.gray100} !important;

            a{
              color: ${({ theme }) => theme.colors.gray600} !important;
            }
          }
        }

        &.ant-pagination-jump-next{
          width: 45px !important;

          .ant-pagination-item-link{
            width: 100%;
          }

          &:hover{
            .anticon{
              color: ${({ theme }) => theme.colors.colorWhite};

            }
          }
        }

        &.ant-pagination-options{
          .ant-select-selector{
            border: 0px;
            background-color: transparent;
          }

          &:hover{
            .ant-select-selector{
              color: ${({ theme }) => theme.colors.colorWhite};
            }
            .ant-select-arrow{
              color: ${({ theme }) => theme.colors.colorWhite} !important;
            }
          }
        }
      }
    }

    .ant-table-content{
      overflow: auto;
    }

    .assets-table{
      .ant-table-content{
        > table{
          @media screen and (max-width: 1279px) {
            width: 1100px;
          }
        }
      }
    }

    .ant-drawer-content{
      @media screen and (max-width: 767px) {
        width: 90% !important;
        height: 90% !important;
        transform: translate(-50%, -50%);
        position: fixed;
        top: 50%;
        left: 50%;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
        border-radius: 8px;
      }
    }

    .mobile-menu-open{
      .head-right-block{
        .header-navigation{
          display: flex !important;
        }
      }
    }

    .offering-table{
      &.ant-table-wrapper{
        .ant-table{
          .ant-table-content{
            > table{
              @media screen and (max-width: 1400px) {
                width: 1500px;
              }
            }
          }
        }
      }
    }

    .mobile-flex-box{
      @media screen and (max-width: 1023px) {
        flex-direction: column;
        align-items: flex-start;
      }

      .ant-segmented{
        @media screen and (max-width: 1023px) {
          margin: 16px 0;
        }
      }
    }
    
`
