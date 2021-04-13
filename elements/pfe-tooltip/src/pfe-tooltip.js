import PFElement from "../../pfelement/dist/pfelement.js";

class PfeTooltip extends PFElement {
  static get tag() {
    return "pfe-tooltip";
  }

  static get meta() {
    return {
      title: "Tooltip",
      description: "Display a tooltip"
    };
  }

  get templateUrl() {
    return "pfe-tooltip.html";
  }

  get styleUrl() {
    return "pfe-tooltip.scss";
  }

  static get events() {
    return {
      hover: `${this.tag}:hover`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      tooltip: {
        title: "Tooltip",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }
    };
  }

  static get slots() {
    return {
      tooltip: {
        title: "Tooltip",
        slotName: "pfe-tooltip--tooltip",
        slotClass: "pfe-tooltip__tooltip",
        slotId: "tooltip"
      }
    };
  }

  constructor() {
    super(PfeTooltip, { type: PfeTooltip.PfeType });

    this._tooltip = this.shadowRoot.querySelector(`#tooltip`);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    this.addEventListener("click", this.hoverHandler);
    this.addEventListener("mouseover", this.hoverHandler);
    this.addEventListener("mouseout", this.hoverHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.hoverHandler);
    this.removeEventListener("mouseover", this.hoverHandler);
    this.removeEventListener("mouseout", this.hoverHandler);
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _hoverHandler(event) {
    this.emitEvent(PfeTooltip.events.hover, {
      detail: {}
    });
  }

  hoverHandler(event) {
    if (event.type == "mouseover") {
      let container = this;
      let parent = this.parentElement;
      let tooltip = this._tooltip;
      let crect = this.getBoundingClientRect();
      let prect = parent.getBoundingClientRect();
      let trect = tooltip.getBoundingClientRect();
      let width = tooltip.clientWidth;
      let height = tooltip.clientHeight;
      let orientation = "north"; // Gotta start somewhere

      tooltip.classList.add("active");
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
          boundarycheck: trect.left - width > crect.left,
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
      tooltip.classList.add(orientation);
      tooltip.style.left = getOrientation[orientation]["left"];
      tooltip.style.top = getOrientation[orientation]["top"];
    } else {
      //this._tooltip.classList.remove("active", "north", "south", "east", "west");
    }
  }
}

PFElement.create(PfeTooltip);

export default PfeTooltip;
