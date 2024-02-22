import { InnerBlocks } from '@wordpress/block-editor';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save() {
	const block = 'wp-block-block-testing-swiper-slider';
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className={`${block}__inner`}>
				<div className={`${block}__swiper swiper`}>
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</div>
			<div className="swiper-pagination"></div>
		</div>
	);
}
