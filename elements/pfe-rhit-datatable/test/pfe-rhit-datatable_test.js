const elements = [...document.querySelectorAll("pfe-rhit-datatable")];

suite("<pfe-rhit-datatable>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-rhit-datatable"),
            customElements.get("pfe-rhit-datatable"),
            "pfe-rhit-datatable should be an instance of pfeRhitDatatable"
        );
    });

    // Write tests for each attribute
    test("color attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" priority attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" paginate attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" searchable attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" sortable attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot
    test("header slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test("footer slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test("search slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test("paginator slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

});
