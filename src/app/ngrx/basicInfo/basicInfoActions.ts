import { createAction, props } from "@ngrx/store";

export const changeName = createAction(
    '[basicInfo/Page]changeName',
    props<{ item: any }>()
  );

  export const changeGameId = createAction(
    '[basicInfo/Page]changeGameId',
    props<{ item: any }>()
  );

export const changePhase = createAction(
    '[basicInfo/Page]changePhase',
    props<{ item: any }>()
  );

  export const validerAction = createAction(
    '[basicInfo/Page] Valider',
    props<{ item: any }>()
  );