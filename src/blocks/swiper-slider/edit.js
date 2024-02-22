import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";
import { useBlockProps } from "@wordpress/block-editor";

/*** CONSTANTS **************************************************************/
const ALLOWED_BLOCKS = ["core/group", "core/cover"];
const TEMPLATE = [["core/cover"]];

export default function Edit() {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				templateLock={false}
				defaultBlock={["core/cover"]}
				directInsert
			/>
		</div>
	);
}
