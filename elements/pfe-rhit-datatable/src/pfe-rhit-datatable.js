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

  constructor() {
    super(PfeRhitDatatable, { type: PfeRhitDatatable.PfeType });

    this._table = this.shadowRoot.querySelector(`#table`);
    this._header = this.shadowRoot.querySelector(`#header`);
    this._footer = this.shadowRoot.querySelector(`#footer`);
    this._search = this.shadowRoot.querySelector(`#search`);
    this._paginator = this.shadowRoot.querySelector(`#paginator`);
  }

  initTableData(table) {
    let rows = table.getElementsByTagName("tr"),
      tableData = [];
    for (let r = 0; r < rows.length; r++) {
      let rowData = [],
        columns = rows[r].getElementsByTagName("td");
      for (let c = 0; c < columns.length; c++) {
        let column = columns[c].innerHTML;
        // Make sure we do proper numeric sorting
        if (!isNaN(Number(column))) column = Number(column);
        rowData.push(column);
      }
      tableData.push(rowData);
    }
    return tableData;
  }

  set tbody(value) {
    this._tbody = value;
    this.originalData = this.initTableData(this._tbody);
    this.tableData = this.originalData;
  }

  get tbody() {
    return this._tbody;
  }

  /* Sort-related code      */
  sortColumn(index = null) {
    if (index != null) {
      if (this.sortIndex != index) {
        // th[this.sortIndex].removeClass(['asc','desc','active']);
        this.flag = -1;
        this.sortIndex = index;
        // th[this.sortIndex].addClass(['asc','active'])
      } else {
        // th[this.sortIndex].addClass('asc' or 'desc')
        this.flag *= -1;
      }
    }
    this.tableData.sort(
      (function(index, flag) {
        return function(a, b) {
          return a[index] === b[index] ? 0 : a[index] < b[index] ? flag : flag * -1;
        };
      })(this.sortIndex, this.flag)
    );
    this.renderTable();
  }
  sortColumnHandler(event) {
    this.sortColumn(event.srcElement.cellIndex);
  }
  /* /Sort-related code     */

  /* Search-related code      */
  set searchField(value) {
    this._searchField = value;
    this._searchField.addEventListener("change", this.searchHandler);
    this._searchField.addEventListener("keyup", this.searchHandler);
  }
  searchFor(search) {
    let searchlist = search
      .split(",") // Multiple search terms separated by commata
      .map(element => element.trim().replace(/\s+/g, ".*")) // replace whitespace with wildcard
      .join("|"); // OR them back together
    if (searchlist.length > 0) {
      let regexp = new RegExp(searchlist, "gi");
      this.tableData = this.originalData.filter(element => element.some(element => String(element).match(regexp)));
    } else {
      this.tableData = this.originalData;
    }
    this.sortColumn();
    this.renderTable();
  }

  searchHandler(event) {
    this.searchFor(event.originalTarget.value);
  }
  /* /Search-related code     */

  /* paginator-related code      */
  activePageHandler(event) {
    console.log(event);
    event.stopPropagation();
    this.activePage = event.originalTarget.href;
    return false;
  }
  set activePage(value) {
    // zero-based
    this._activePage = value;
    // TODO: Build page list
    let pageList = [];
    if (this._activePage > 0) {
      pageList.push({ value: "«", href: 0 });
      pageList.push({ value: "‹", href: this._activePage - 1 });
    }
    for (let i = 0; i < this.pageCount; i++) {
      pageList.push({ value: i + 1, href: i });
    }
    if (this._activePage < this.pageCount - 1) {
      pageList.push({ value: "›", href: this._activePage + 1 });
      pageList.push({ value: "»", href: this.pageCount - 1 });
    }
    this.pagerList.innerHTML = "";
    for (let i = 0; i < pageList.length; i++) {
      //let a = document.createElement('a');
      let li = document.createElement("li");
      li.innerHTML = pageList[i]["value"];
      li.href = pageList[i]["href"];
      li.addEventListener("click", this.activePageHandler);
      //li.appendChild(a);
      this.pagerList.appendChild(li);
    }
    this.renderTable();
  }
  get activePage() {
    return this._activePage;
  }

  set pageCount(value) {
    this._pageCount = value;
    // TODO: Calculate proper new page based on current view
    this.activePage = 0; // Set first page as active
  }
  get pageCount() {
    return this._pageCount;
  }
  set rowSelector(value) {
    this._rowSelector = value;
    this.tableRows = this._rowSelector.querySelectorAll("option:checked")[0].value;
    this.pageCount = Math.ceil(this.tableData.length / this.tableRows);
    this._rowSelector.addEventListener("change", this.changeRowCount);
  }

  changeRowCount(event) {
    this.tableRows = this._rowSelector.querySelectorAll("option:checked")[0].value;
    this.pageCount = Math.ceil(this.tableData.length / this.tableRows);
    this.renderTable();
  }
  /* /paginator-related code     */

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.sortColumnHandler = this.sortColumnHandler.bind(this);
    this.changeRowCount = this.changeRowCount.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.activePageHandler = this.activePageHandler.bind(this);

    this.tbody = this.querySelector("tbody");
    this.searchField = this.shadowRoot.querySelector("#searchField");
    this.pagerList = this.shadowRoot.querySelector("#pagerList");
    this.rowSelector = this.shadowRoot.querySelector("#rowSelector");

    this.querySelectorAll("th").forEach(element => element.addEventListener("click", this.sortColumnHandler));

    this.renderTable();

    /*
    this.header = this.querySelector(`[slot="${this.tag}--header"]`);
    this.footer = this.querySelector(`[slot="${this.tag}--footer"]`);
    this.search = this.querySelector(`[slot="${this.tag}--search"]`);
    this.paginator = this.querySelector(`[slot="${this.tag}--paginator"]`);
    // Add a slotchange listener to the lightDOM trigger
    // this.header.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.footer.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.paginator.addEventListener("slotchange", this._init);
    */
  }

  renderTable() {
    // TODO: Fix start- and endpoints
    const startRow = this.activePage * this.tableRows;
    const endRow = Math.min(this.tableRows * (this.activePage + 1), this.tableData.length);
    this.tbody.innerHTML = "";
    for (let r = startRow; r < endRow; r++) {
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
