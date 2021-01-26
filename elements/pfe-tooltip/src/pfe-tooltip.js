import PFElement from "../../pfelement/dist/pfelement.js";

class PfeTooltip extends PFElement {
  static get tag() {
    return "pfe-tooltip";
  }

  static get meta() {
    return {
      title: "Tooltip",
      description: "Provide a tool-tip"
    };
  }

  get templateUrl() {
    return "pfe-tooltip.html";
  }

  get styleUrl() {
    return "pfe-tooltip.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      color: {
        title: "Color",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      priority: {
        title: " priority",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      orientation: {
        title: " orientation",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }
    };
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        slotName: "pfe-tooltip--header",
        slotClass: "pfe-tooltip__header",
        slotId: "header"
      },
      content: {
        title: "Content",
        slotName: "pfe-tooltip--content",
        slotClass: "pfe-tooltip__content",
        slotId: "content"
      },
      footer: {
        title: "Footer",
        slotName: "pfe-tooltip--footer",
        slotClass: "pfe-tooltip__footer",
        slotId: "footer"
      }
    };
  }

  hoverHandler(event) {
    if (event.type == "mouseover") {
      this.container.classList.add("active");
      let prect = this.parent.getBoundingClientRect();
      let crect = this.container.getBoundingClientRect();
      let width = this.tooltip.clientWidth;
      let height = this.tooltip.clientHeight;

      let orientation = "south";

      let getOrientation = {
        north: {
          order: ["north", "south", "east", "west"],
          boundarycheck: crect.top - height > prect.top,
          left: "-" + width / 2 + "px",
          top: ""
        },
        south: {
          order: ["south", "north", "east", "west"],
          boundarycheck: crect.bottom + height < prect.bottom,
          left: "-" + width / 2 + "px",
          top: ""
        },
        east: {
          order: ["east", "west", "north", "south"],
          boundarycheck: crect.right + width < prect.right,
          left: "",
          top: "-" + height / 2 + "px"
        },
        west: {
          order: ["west", "east", "north", "south"],
          boundarycheck: crect.left - width > prect.left,
          left: "",
          top: "-" + height / 2 + "px"
        }
      };
      for (let x of getOrientation[orientation]["order"]) {
        if (getOrientation[x]["boundarycheck"]) {
          orientation = x;
          break;
        }
      }
      this.container.classList.add(orientation);
      this.tooltip.style.left = getOrientation[orientation]["left"];
      this.tooltip.style.top = getOrientation[orientation]["top"];
    } else {
      this.container.classList.remove("active", "north", "south", "east", "west");
    }
  }

  constructor() {
    super(PfeTooltip, { type: PfeTooltip.PfeType });

    this._header = this.shadowRoot.querySelector(`#header`);
    this._content = this.shadowRoot.querySelector(`#content`);
    this._footer = this.shadowRoot.querySelector(`#footer`);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.header = this.querySelector(`[slot="${this.tag}--header"]`);
    this.content = this.querySelector(`[slot="${this.tag}--content"]`);
    this.footer = this.querySelector(`[slot="${this.tag}--footer"]`);
    this.parent = this.parentElement;
    this.container = this.shadowRoot.querySelector("#container");
    this.tooltip = this.container.querySelector(".tooltip");
    this.addEventListener("click", this.hoverHandler);
    this.addEventListener("mouseover", this.hoverHandler);
    this.addEventListener("mouseout", this.hoverHandler);
    // Add a slotchange listener to the lightDOM trigger
    // this.header.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.content.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.footer.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
}

PFElement.create(PfeTooltip);

export default PfeTooltip;
