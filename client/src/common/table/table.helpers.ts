import { TFunction } from "i18next";

export const getTableLocale = (t: TFunction) => ({
  filterTitle: t("TABLE.FILTER_TITLE"),
  filterConfirm: t("TABLE.FILTER_CONFIRM"),
  filterReset: t("TABLE.FILTER_RESET"),
  filterEmptyText: t("TABLE.FILTER_EMPTY_TEXT"),
  filterCheckall: t("TABLE.FILTER_CHECK_ALL"),
  filterSearchPlaceholder: t("TABLE.FILTER_SEARCH_PLACEHOLDER"),
  emptyText: t("TABLE.EMPTY_TEXT"),
  selectAll: t("TABLE.SELECT_ALL"),
  selectInvert: t("TABLE.SELECT_INVERT"),
  selectNone: t("TABLE.SELECT_NONE"),
  selectionAll: t("TABLE.SELECTION_ALL"),
  sortTitle: t("TABLE.SORT_TITLE"),
  expand: t("TABLE.EXPAND"),
  collapse: t("TABLE.COLLAPSE"),
  triggerDesc: t("TABLE.TRIGGER_DESC"),
  triggerAsc: t("TABLE.TRIGGER_ASC"),
  cancelSort: t("TABLE.CANCEL_SORT"),
});
