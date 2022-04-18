import { store } from "./store.service";

export type RootState = ReturnType<typeof store.getState>;

export type ThunkDispatchType = typeof store.dispatch;

export type SelectorType = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

export interface ThunkApiConfig {
  state: RootState;
}
