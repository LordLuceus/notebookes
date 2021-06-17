import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  bundle: {
    [key: string]:
      | {
          processing: boolean;
          code: string;
          err: string;
        }
      | undefined;
  };
  initialised: boolean;
}

const initialState: BundleState = { initialised: false, bundle: {} };

const reducer = produce((state: BundleState, action: Action): BundleState => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state.bundle[action.payload.cellId] = {
        processing: true,
        code: "",
        err: "",
      };

      return state;
    case ActionType.BUNDLE_COMPLETE:
      state.bundle[action.payload.cellId] = {
        processing: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };

      return state;
    case ActionType.INITIALISE_BUNDLER:
      state.initialised = true;

      return state;
    default:
      return state;
  }
}, initialState);

export default reducer;
