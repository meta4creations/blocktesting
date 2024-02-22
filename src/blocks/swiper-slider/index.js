import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import "./index.scss";

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});
