import { ComponentsPropsList } from '@mui/material/styles';
import * as React from 'react';

/**
 * Set the types of the texts in the grid.
 */
export interface GridLocaleText {
  // Root
  noRowsLabel: string;
  noResultsOverlayLabel: string;

  // Density selector toolbar button text
  toolbarDensity: React.ReactNode;
  toolbarDensityLabel: string;
  toolbarDensityCompact: string;
  toolbarDensityStandard: string;
  toolbarDensityComfortable: string;

  // Columns selector toolbar button text
  toolbarColumns: React.ReactNode;
  toolbarColumnsLabel: string;

  // Filters toolbar button text
  toolbarFilters: React.ReactNode;
  toolbarFiltersLabel: string;
  toolbarFiltersTooltipHide: React.ReactNode;
  toolbarFiltersTooltipShow: React.ReactNode;
  toolbarFiltersTooltipActive: (count: number) => React.ReactNode;

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: string;
  toolbarQuickFilterLabel: string;
  toolbarQuickFilterDeleteIconLabel: string;

  // Export selector toolbar button text
  toolbarExport: React.ReactNode;
  toolbarExportLabel: string;
  toolbarExportCSV: React.ReactNode;
  toolbarExportPrint: React.ReactNode;
  toolbarExportExcel: string;

  // Columns panel text
  columnsPanelTextFieldLabel: string;
  columnsPanelTextFieldPlaceholder: string;
  columnsPanelDragIconLabel: string;
  columnsPanelShowAllButton: React.ReactNode;
  columnsPanelHideAllButton: React.ReactNode;

  // Filter panel text
  filterPanelAddFilter: React.ReactNode;
  filterPanelRemoveAll: React.ReactNode;
  filterPanelDeleteIconLabel: string;
  filterPanelLogicOperator: string;
  filterPanelOperator: React.ReactNode;
  filterPanelOperatorAnd: React.ReactNode;
  filterPanelOperatorOr: React.ReactNode;
  filterPanelColumns: React.ReactNode;
  filterPanelInputLabel: string;
  filterPanelInputPlaceholder: string;

  // Filter operators text
  filterOperatorContains: string;
  filterOperatorEquals: string;
  filterOperatorStartsWith: string;
  filterOperatorEndsWith: string;
  filterOperatorIs: string;
  filterOperatorNot: string;
  filterOperatorAfter: string;
  filterOperatorOnOrAfter: string;
  filterOperatorBefore: string;
  filterOperatorOnOrBefore: string;
  filterOperatorIsEmpty: string;
  filterOperatorIsNotEmpty: string;
  filterOperatorIsAnyOf: string;

  // Filter values text
  filterValueAny: string;
  filterValueTrue: string;
  filterValueFalse: string;

  // Column menu text
  columnMenuLabel: string;
  columnMenuShowColumns: React.ReactNode;
  columnMenuManageColumns: React.ReactNode;
  columnMenuFilter: React.ReactNode;
  columnMenuHideColumn: React.ReactNode;
  columnMenuUnsort: React.ReactNode;
  columnMenuSortAsc: React.ReactNode;
  columnMenuSortDesc: React.ReactNode;

  // Column header text
  columnHeaderFiltersTooltipActive: (count: number) => React.ReactNode;
  columnHeaderFiltersLabel: string;
  columnHeaderSortIconLabel: string;

  // Rows selected footer text
  footerRowSelected: (count: number) => React.ReactNode;

  // Total rows footer text
  footerTotalRows: React.ReactNode;

  // Total visible rows footer text
  footerTotalVisibleRows: (
    visibleCount: number,
    totalCount: number
  ) => React.ReactNode;

  // Checkbox selection text
  checkboxSelectionHeaderName: string;
  checkboxSelectionSelectAllRows: string;
  checkboxSelectionUnselectAllRows: string;
  checkboxSelectionSelectRow: string;
  checkboxSelectionUnselectRow: string;

  // Boolean cell text
  booleanCellTrueLabel: string;
  booleanCellFalseLabel: string;

  // Actions cell more text
  actionsCellMore: string;

  // Column pinning text
  pinToLeft: string;
  pinToRight: string;
  unpin: string;

  // Tree Data
  treeDataGroupingHeaderName: string;
  treeDataExpand: string;
  treeDataCollapse: string;

  // Grouping columns
  groupingColumnHeaderName: string;
  groupColumn: (name: string) => string;
  unGroupColumn: (name: string) => string;

  // Master/detail
  detailPanelToggle: string;
  expandDetailPanel: string;
  collapseDetailPanel: string;

  // Row reordering text
  rowReorderingHeaderName: string;

  // Aggregation
  aggregationMenuItemHeader: string;
  aggregationFunctionLabelSum: string;
  aggregationFunctionLabelAvg: string;
  aggregationFunctionLabelMin: string;
  aggregationFunctionLabelMax: string;
  aggregationFunctionLabelSize: string;

  // Used core components translation keys
  MuiTablePagination: Omit<
    ComponentsPropsList['MuiTablePagination'],
    'page' | 'count' | 'onChangePage' | 'rowsPerPage' | 'onPageChange'
  >;
}

export type GridTranslationKeys = keyof GridLocaleText;

/**
 * The grid locale text API [[apiRef]].
 */
export interface GridLocaleTextApi {
  /**
   * Returns the translation for the `key`.
   * @param {T} key One of the keys in [[GridLocaleText]].
   * @returns {GridLocaleText[T]} The translated value.
   */
  getLocaleText: <T extends GridTranslationKeys>(key: T) => GridLocaleText[T];
}

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'Nem um produto encontrado',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Columns',
  toolbarColumnsLabel: 'Select columns',

  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Show filters',
  toolbarFiltersTooltipHide: 'Hide filters',
  toolbarFiltersTooltipShow: 'Show filters',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Search…',
  toolbarQuickFilterLabel: 'Search',
  toolbarQuickFilterDeleteIconLabel: 'Clear',

  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Download as CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Download as Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Find column',
  columnsPanelTextFieldPlaceholder: 'Column title',
  columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: 'Show all',
  columnsPanelHideAllButton: 'Hide all',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelRemoveAll: 'Deletar tudo',
  filterPanelDeleteIconLabel: 'Excluir',
  filterPanelLogicOperator: 'Logic operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: 'Columns',
  filterPanelInputLabel: 'Value',
  filterPanelInputPlaceholder: 'Filter value',

  // Filter operators text
  filterOperatorContains: 'contains',
  filterOperatorEquals: 'equals',
  filterOperatorStartsWith: 'starts with',
  filterOperatorEndsWith: 'ends with',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: 'is empty',
  filterOperatorIsNotEmpty: 'is not empty',
  filterOperatorIsAnyOf: 'is any of',

  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Show columns',
  columnMenuManageColumns: 'Manage columns',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Hide column',
  columnMenuUnsort: 'Unsort',
  columnMenuSortAsc: 'Sort by ASC',
  columnMenuSortDesc: 'Sort by DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
  columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: 'Sort',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total row amount footer text
  footerTotalRows: 'Total Rows:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selection',
  checkboxSelectionSelectAllRows: 'Select all rows',
  checkboxSelectionUnselectAllRows: 'Unselect all rows',
  checkboxSelectionSelectRow: 'Select row',
  checkboxSelectionUnselectRow: 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: 'yes',
  booleanCellFalseLabel: 'no',

  // Actions cell more text
  actionsCellMore: 'more',

  // Column pinning text
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  unpin: 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Grouping columns
  groupingColumnHeaderName: 'Group',
  groupColumn: (name) => `Group by ${name}`,
  unGroupColumn: (name) => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size',
};
