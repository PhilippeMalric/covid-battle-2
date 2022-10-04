import { createSelector } from "@ngrx/store";


export interface TestFeatureState {
    phase:string,
    name:string,
    gameId:string,
    params:any
  }


export const selectState = (state: TestFeatureState) => state;


export const selectGameState = createSelector(
    selectState,
    (state: any) => state.gameState
  );

export const selectPhase = createSelector(
   selectGameState,
    (state: any) => state.phase
  );

  export const selectParams = createSelector(
    selectGameState,
     (state: any) => state.params
   );