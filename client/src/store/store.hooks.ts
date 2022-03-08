import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import { SelectorType, ThunkDispatchType } from "./store.types";

export const useSelector = useReduxSelector as SelectorType;

export const useDispatch = useReduxDispatch;

export const useThunkDispatch = () => useReduxDispatch<ThunkDispatchType>();
