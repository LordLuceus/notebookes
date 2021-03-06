import { ActionType } from "../action-types";
import { Cell, CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface InitialiseBundlerAction {
  type: ActionType.INITIALISE_BUNDLER;
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrAction {
  type: ActionType.FETCH_CELLS_ERR;
  payload: string;
}

export interface SaveCellsErrAction {
  type: ActionType.SAVE_CELLS_ERR;
  payload: string;
}

export type Action =
  | InsertCellAfterAction
  | DeleteCellAction
  | UpdateCellAction
  | MoveCellAction
  | BundleStartAction
  | BundleCompleteAction
  | InitialiseBundlerAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrAction
  | SaveCellsErrAction;
