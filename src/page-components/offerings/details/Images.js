import styled from 'styled-components'

const ImageSlider = styled.div`
	margin-bottom: 24px;
	overflow-x: auto;
	margin-right: -52px;

	@media screen and (max-width: 1279px) {
		margin-right: -32px;
	}

	@media screen and (max-width: 1023px) {
		margin-right: 0px;
	}
	&::-webkit-scrollbar {
      height: 8px;
    }
    
    &::-webkit-scrollbar-track {
      /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #858180;
	  border-radius: 8px;
    }

	.image-slider-block{
		width: 1480px;
		display: flex;
		margin: 0 -8px;

		@media screen and (max-width: 1279px) {
			width: 1080px;
		}
	}
	.image-items{
		width: 740px;
		display: flex;
		padding: 0 8px;

		@media screen and (max-width: 1279px) {
			width: 540px;
		}
	}

	img{
		height: 416px;
		object-fit: cover;
		width: 100%;
		border-radius: 6px;

		@media screen and (max-width: 1279px) {
			height: 316px;
		}
	}
`

export const OfferingImages = ({ images }) => {
  return (
	<ImageSlider>
		<div className="image-slider-block">
			{images.map(item => (<div className="image-items" key={item._id}>
				<img alt={item.description} src={item.url} />
			</div>))}
		</div>
    </ImageSlider>
  )
}