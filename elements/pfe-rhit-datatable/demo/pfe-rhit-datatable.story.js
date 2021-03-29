import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeRhitDatatable from "../dist/pfe-rhit-datatable";

const stories = storiesOf("Rhit datatable", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeRhitDatatable.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfeRhitDatatable.tag, () => {
  let config = {};
  const props = PfeRhitDatatable.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, bridge);

  const slots = PfeRhitDatatable.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["header"] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["color"] === "default") {
  //   config.prop["color"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
