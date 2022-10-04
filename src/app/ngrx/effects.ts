import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, combineLatestWith, concatMap, map, of, switchMap, take, tap } from "rxjs";
import { GlobalService } from "../global.service";
import { loadAction } from "./actions";
import { validerAction } from "./basicInfo/basicInfoActions";
import { TestFeatureState } from "./selector";


@Injectable()
export class AppEffects {
  constructor(
    private globalService : GlobalService,
    private store: Store<TestFeatureState>,
    private actions$: Actions) {}

  helper:any  = () =>
  {
   return this.actions$.pipe(
    ofType(validerAction),
    combineLatestWith(this.store.pipe(take(1))),
    tap((data)=>{
      console.log("effet",data);

      this.globalService.getItemsGameByGameId(data)

      
    })
    
    )
  }

  reset$ = createEffect(this.helper,{ dispatch: false })


}

