import * as esbuild from "esbuild-wasm";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { CellTypes } from "../cell";

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (
  cellId: string,
  input: string
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch, getState) => {
    const { bundles } = getState();

    if (!bundles.initialised) {
      await esbuild.initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.12.8/esbuild.wasm",
      });

      dispatch({ type: ActionType.INITIALISE_BUNDLER });
    }

    dispatch({ type: ActionType.BUNDLE_START, payload: { cellId } });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
