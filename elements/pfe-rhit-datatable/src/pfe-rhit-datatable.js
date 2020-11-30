import PFElement from "../../pfelement/dist/pfelement.js";

class PfeRhitDatatable extends PFElement {
  static get tag() {
    return "pfe-rhit-datatable";
  }

  static get meta() {
    return {
      title: "Rhit datatable",
      description: "Searchable, sortable, paginated table"
    };
  }

  get templateUrl() {
    return "pfe-rhit-datatable.html";
  }

  get styleUrl() {
    return "pfe-rhit-datatable.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    event.target;
    return PFElement.PfeTypes.Combo;
  }

  static get properties() {
    return {
      color: {
        title: "Color",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      priority: {
        title: "priority",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      paginate: {
        title: "paginate",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      searchable: {
        title: "searchable",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      },
      sortable: {
        title: "sortable",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }
    };
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        slotName: "pfe-rhit-datatable--header",
        slotClass: "pfe-rhit-datatable__header",
        slotId: "header"
      },
      footer: {
        title: "Footer",
        slotName: "pfe-rhit-datatable--footer",
        slotClass: "pfe-rhit-datatable__footer",
        slotId: "footer"
      },
      search: {
        title: "Search",
        slotName: "pfe-rhit-datatable--search",
        slotClass: "pfe-rhit-datatable__search",
        slotId: "search"
      },
      paginator: {
        title: "Paginator",
        slotName: "pfe-rhit-datatable--paginator",
        slotClass: "pfe-rhit-datatable__paginator",
        slotId: "paginator"
      }
    };
  }

  setTableData(table) {
    let rows = table.getElementsByTagName("tr"),
      tableData = [];
    for (let r = 0; r < rows.length; r++) {
      let rowData = [],
        columns = rows[r].getElementsByTagName("td");
      for (let c = 0; c < columns.length; c++) {
        rowData.push(columns[c].innerHTML);
      }
      tableData.push(rowData);
    }
    return tableData;
  }

  constructor() {
    super(PfeRhitDatatable, { type: PfeRhitDatatable.PfeType });

    this._header = this.shadowRoot.querySelector(`#header`);
    this._footer = this.shadowRoot.querySelector(`#footer`);
    this._search = this.shadowRoot.querySelector(`#search`);
    this._paginator = this.shadowRoot.querySelector(`#paginator`);
  }

  sortColumn(index = null) {
    if (index) {
      if (this.sortIndex != index) {
        this.flag = -1;
        this.sortIndex = index;
      } else {
        this.flag *= -1;
      }
    } else {
      index = this.sortIndex;
    }
    this.tableData.sort(
      (function(index, flag) {
        return function(a, b) {
          return a[index] === b[index] ? 0 : a[index] < b[index] ? flag : flag * -1;
        };
      })(index, this.flag)
    );
    this.renderTable();
  }
  sortColumnHandler(event) {
    this.sortColumn(event.srcElement.cellIndex);
  }

  changeRowCount(event) {
    this.tableRows = this.rowSelector.querySelectorAll("option:checked")[0].value;
    this.renderTable();
  }

  searchFor(search) {
    let searchlist = search
      .split(",")
      .map(element => element.trim().replace(/\s+/g, ".*"))
      .join("|");
    if (searchlist.length > 0) {
      let regexp = new RegExp(searchlist, "gi");
      this.tableData = this.originalData.filter(element => element.some(element => element.match(regexp)));
    }
    this.sortColumn();
    this.renderTable();
  }

  searchHandler(event) {
    this.searchFor(this.searchField.value);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.sortColumnHandler = this.sortColumnHandler.bind(this);
    this.changeRowCount = this.changeRowCount.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.header = this.querySelector(`[slot="${this.tag}--header"]`);
    this.footer = this.querySelector(`[slot="${this.tag}--footer"]`);
    this.search = this.querySelector(`[slot="${this.tag}--search"]`);
    this.paginator = this.querySelector(`[slot="${this.tag}--paginator"]`);
    this._columns = this.querySelectorAll("th");
    this.tbody = this.querySelector("tbody");
    this.rowSelector = this.shadowRoot.querySelector("#rowSelector");
    this.searchField = this.shadowRoot.querySelector("#searchField");
    this.tableData = this.setTableData(this.tbody);
    this.originalData = this.tableData;
    this.tableRows = this.rowSelector.querySelectorAll("option:checked")[0].value;

    for (let index = 0; index < this._columns.length; index++) {
      let column = this._columns[index];
      column.addEventListener("click", this.sortColumnHandler);
    }
    this.rowSelector.addEventListener("change", this.changeRowCount);
    //this.searchField.addEventListener('change', this.searchHandler);
    this.searchField.addEventListener("keyup", this.searchHandler);

    this.renderTable();

    // Add a slotchange listener to the lightDOM trigger
    // this.header.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.footer.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.paginator.addEventListener("slotchange", this._init);
  }

  renderTable() {
    // TODO: Fix start- and endpoints
    let count = Math.min(this.tableRows, this.tableData.length);
    this.tbody.innerHTML = "";
    for (let r = 0; r < count; r++) {
      let row = this.tableData[r],
        tr = document.createElement("tr");
      for (let c = 0; c < row.length; c++) {
        let column = row[c],
          td = document.createElement("td");
        td.innerHTML = column;
        tr.appendChild(td);
      }
      this.tbody.appendChild(tr);
    }
  }

  disconnectedCallback() {
    console.log("disconnectedCallback()");
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
}

PFElement.create(PfeRhitDatatable);

export default PfeRhitDatatable;
