# PatternFly Element | Rhit datatable element
Searchable, sortable, paginated table

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-rhit-datatable>
    <!-- Default slot -->
    <h2>This is pfe-rhit-datatable</h2>
    <!-- Named slots -->
    <div slot="header">header slot</div>
    <div slot="footer">footer slot</div>
    <div slot="search">search slot</div>
    <div slot="paginator">paginator slot</div>
</pfe-rhit-datatable>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `header`: Describe this slot and best practices around what markup it can contain.
- `footer`: Describe this slot and best practices around what markup it can contain.
- `search`: Describe this slot and best practices around what markup it can contain.
- `paginator`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `pfe-color`: Describe this attribute and what function is serves.
- `pfe- priority`: Describe this attribute and what function is serves.
- `pfe- paginate`: Describe this attribute and what function is serves.
- `pfe- searchable`: Describe this attribute and what function is serves.
- `pfe- sortable`: Describe this attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-pfe-rhit-datatable--Color` | `#252527` | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.


## Dependencies
Describe any dependent elements or libraries here too.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Rhit datatable (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
