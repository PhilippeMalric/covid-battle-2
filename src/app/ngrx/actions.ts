import { createAction, props } from "@ngrx/store";



export const testAction = createAction(
    '[Test/Page] Gros test',
    props<{ item: any }>()
  );



  export const loadAction = createAction(
    '[Test/Page] loadAction',
    props<{ item: any }>()
  );