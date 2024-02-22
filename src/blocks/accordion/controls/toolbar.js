/*** IMPORTS ****************************************************************/

// WordPress Dependencies
import { __ } from "@wordpress/i18n";
import { Button, Toolbar } from "@wordpress/components";

/*** COMPONENTS **************************************************************/

const TogglePreview = (props) => {
  const { attributes, setAttributes } = props;

  const isEditing = attributes.mode === "edit";

  const onClick = () => {
    setAttributes({ mode: isEditing ? "preview" : "edit" });
  };

  const PreviewButton = (
    <Button
      label={__("Preview", "block-testing")}
      icon="visibility"
      onClick={onClick}
    />
  );

  const EditButton = (
    <Button label={__("Edit", "block-testing")} icon="edit" onClick={onClick} />
  );

  return isEditing ? PreviewButton : EditButton;
};

const Tools = (props) => {
  return (
    <Toolbar>
      <TogglePreview {...props} />
    </Toolbar>
  );
};

/*** EXPORTS ****************************************************************/

export default Tools;
