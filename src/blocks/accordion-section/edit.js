/*** IMPORTS ****************************************************************/

// WordPress dependencies
import {} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
  RichText,
  InnerBlocks,
  useBlockProps,
  InspectorControls,
  withColors,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

/*** CONSTANTS **************************************************************/
const ALLOWED_BLOCKS = [
  "core/paragraph",
  "core/heading",
  "core/image",
  "core/list",
  "core/quote",
  "core/html",
  "core/buttons",
  "core/button",
  "core/columns",
];
const BLOCK_TEMPLATE = [["core/paragraph", {}]];

/*** COMPONTANTS ************************************************************/

/**
 * The editor for the block
 * @param {*} props
 * @returns {WPElement}
 */
function Edit(props) {
  const {
    titleColor,
    setTitleColor,
    titleBackgroundColor,
    setTitleBackgroundColor,
    isSelected,
    attributes: { title },
    setAttributes,
    open,
    setState,
  } = props;

  const [showContent, setShowContent] = useState(false);

  const block = `wp-block-block-testing-accordion-section`;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelColorSettings
          title={__("Toggle Colors", "block-testing")}
          initialOpen={true}
          colorSettings={[
            {
              value: titleColor.color,
              onChange: setTitleColor,
              label: __("Title Color", "block-testing"),
            },
            {
              value: titleBackgroundColor.color,
              onChange: setTitleBackgroundColor,
              label: __("Background Color", "block-testing"),
            },
          ]}
        />
      </InspectorControls>
      <div
        className={`${block}__header`}
        style={{
          color: titleColor.color,
          backgroundColor: titleBackgroundColor.color,
        }}
      >
        <span
          class={`${block}__header__icon`}
          aria-hidden="true"
          onClick={() => setShowContent(!showContent)}
          style={showContent ? { transform: "rotate(180deg)" } : null}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.87 20.44">
            <path
              d="M12.84.79c.8-1.06 2.39-1.06 3.19 0l12.43 16.44c1 1.32.06 3.21-1.59 3.21H2c-1.65 0-2.59-1.89-1.6-3.21L12.84.79Z"
              style={{ fill: "currentColor" }}
            />
          </svg>
        </span>
        <RichText
          placeholder={__("Section Title")}
          tagName="h3"
          value={title}
          onChange={(title) => setAttributes({ title })}
          className={`${block}__title`}
          style={{
            color: titleColor.color,
          }}
        />
      </div>
      {showContent && (
        <div className={`${block}__body`}>
          <div className={`${block}__body__content`}>
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={BLOCK_TEMPLATE}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default withColors("titleColor", "titleBackgroundColor")(Edit);
