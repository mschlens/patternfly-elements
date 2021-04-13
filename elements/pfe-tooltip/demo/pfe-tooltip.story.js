import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeTooltip from "../dist/pfe-tooltip";

const stories = storiesOf("Tooltip", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeTooltip.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfeTooltip.tag, () => {
  let config = {};
  const props = PfeTooltip.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeTooltip);

  const slots = PfeTooltip.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["container"] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["container"] === "default") {
  //   config.prop["container"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});