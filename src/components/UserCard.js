const { default: styled } = require("styled-components");

export const UserCard = styled.div`
    width: 480px;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    position: relative;
    border-radius: ${({ theme }) => theme.borderRadius.border16};
    padding: 48px 24px 24px;
    overflow: hidden;

    @media screen and (max-width: 666px){
        width: 100%;
    }

    .user-profile-image{
        @media screen and (max-width: 666px){
            flex-direction: column-reverse;
            align-items: flex-start;
        }   
    }
    .profile-image{
        @media screen and (max-width: 666px){
            margin-bottom: 24px;
        }
    }
    .mb-4, .mb-32, .email-block{
        @media screen and (max-width: 666px){
            margin-bottom: 16px !important;
        }
    }
    &.non-badge {
        padding: 24px 24px;
        &:after {
            height: 0px;
            border: 0px;
        }
    }
    &:after{
        background: ${({ theme }) => theme.colors.gray100};
        border: 1px solid ${({ theme }) => theme.colors.gray200};
        border-radius: ${({ theme }) => theme.borderRadius.border32};
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04) inset;
        position: absolute;
        content: "";
        top: 24px;
        left: 50%;
        width: 96px;
        height: 16px;
        transform: translateX(-50px);        
    }

    &:before{
        background-image: url("data:image/svg+xml,%3Csvg width='488' height='311' viewBox='0 0 488 311' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0_803_8' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='4' y='2' width='480' height='309'%3E%3Crect x='4.5' y='2.5' width='479' height='308' fill='white' stroke='%23E4E4E7' stroke-linejoin='round'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_803_8)'%3E%3Cg opacity='0.5' filter='url(%23filter0_f_803_8)'%3E%3Cellipse cx='32' cy='5.25' rx='28' ry='27.5' fill='%239676A7'/%3E%3C/g%3E%3Cg opacity='0.5' filter='url(%23filter1_f_803_8)'%3E%3Ccircle cx='173.5' cy='5.25' r='27.5' fill='%23F7D763'/%3E%3C/g%3E%3Cg opacity='0.5' filter='url(%23filter2_f_803_8)'%3E%3Cellipse cx='315' cy='5.25' rx='28' ry='27.5' fill='%23A0C0CB'/%3E%3C/g%3E%3Cg opacity='0.5' filter='url(%23filter3_f_803_8)'%3E%3Cellipse cx='457' cy='5.25' rx='28' ry='27.5' fill='%23ABDEBC'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_803_8' x='-120' y='-146.25' width='304' height='303' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='62' result='effect1_foregroundBlur_803_8'/%3E%3C/filter%3E%3Cfilter id='filter1_f_803_8' x='22' y='-146.25' width='303' height='303' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='62' result='effect1_foregroundBlur_803_8'/%3E%3C/filter%3E%3Cfilter id='filter2_f_803_8' x='163' y='-146.25' width='304' height='303' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='62' result='effect1_foregroundBlur_803_8'/%3E%3C/filter%3E%3Cfilter id='filter3_f_803_8' x='305' y='-146.25' width='304' height='303' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='62' result='effect1_foregroundBlur_803_8'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        position: absolute;
        content: "";
        left: -4px;
        top: -2px;
        right: -4px;
        bottom: -2px;
    }
`