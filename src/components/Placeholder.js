import { Skeleton } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const CardLayout = styled.div`
    box-shadow: 0px 5px 25px rgba(57, 57, 72, 0.05);
	border-radius: 10px;
    position: relative;
    max-height: 400px;
    display:flex;
    flex-direction:column;  
    height: 100%;

    .img-container {
        height : 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
            aspect-ratio: 1 / 1;
        }
    }
    
    .card-details {
        position : absolute;
        bottom: 0;
        left : 0;
        width : 100%;
        padding : 10px;
    }
      
    .tag-freeEvent {
        float: right;
        position: relative;
    }

    .ant-skeleton-image {
        height: 400px !important;
        width:100% !important;
        border-radius: 10px !important;
    }
`

const CardDetails = styled.div`
    position : absolute;
    bottom: 0;
    left : 0;
    width : 100%;
    padding : 10px;
`

export function AppListSkeleton({ size = 8,classStyle }) {
	const lines = useMemo(() => Array.from({ length: size },(_,k) => k),[size]);

	return (
		<>
			{lines.map((line) => (
				<div className={classStyle} key={line}>
					<CardLayout>
						<Skeleton.Image active />
						<CardDetails>
							<div className="mt-2  tag-freeEvent"><Skeleton.Button size="small" /></div>
							<div className="mt-2"><Skeleton.Input size="small" /></div>
							<div className="mt-2"><Skeleton.Input size="small" /></div>
							<div className="mt-2"><Skeleton.Input size="small" /></div>
							<div className="mt-2"><Skeleton.Input size="small" /></div>
							<div className="mt-2"><Skeleton.Input block size="large" /></div>
						</CardDetails>
					</CardLayout>
				</div>
			))}
		</>
	)
}