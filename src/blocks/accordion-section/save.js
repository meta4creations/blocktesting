import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
  const {
    attributes: {
      title,
      titleColor,
      customTitleColor,
      titleBackgroundColor,
      customTitleBackgroundColor,
    },
  } = props;

  const block = `wp-block-block-testing-accordion-section`;

  let headerClasses = `${block}__header`;
  if (titleColor) {
    headerClasses += ` has-${titleColor}-color`;
  }
  if (titleBackgroundColor) {
    headerClasses += ` has-${titleBackgroundColor}-background-color`;
  }

  let headerStyles = {};
  if (customTitleColor) {
    headerStyles.color = customTitleColor;
  }
  if (customTitleBackgroundColor) {
    headerStyles.backgroundColor = customTitleBackgroundColor;
  }

  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps}>
      <header className={headerClasses} style={headerStyles}>
        <span class={`${block}__header__icon`} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.87 20.44">
            <path
              d="M12.84.79c.8-1.06 2.39-1.06 3.19 0l12.43 16.44c1 1.32.06 3.21-1.59 3.21H2c-1.65 0-2.59-1.89-1.6-3.21L12.84.79Z"
              style={{ fill: "currentColor" }}
            />
          </svg>
        </span>
        <RichText.Content
          tagName="h3"
          className={`${block}__header__title`}
          value={title}
        />
      </header>
      <main className={`${block}__body`} style={{ height: 0 }}>
        <div className={`${block}__body__content`}>
          <InnerBlocks.Content />
        </div>
      </main>
    </section>
  );
};

/*** EXPORTS ****************************************************************/
export default Save;
