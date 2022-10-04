import { Action, createReducer, on } from "@ngrx/store";
import { TestFeatureState } from "./selector";
import { changeGameId, changeName, changePhase, validerAction } from "./basicInfo/basicInfoActions";
import { loadAction } from "./actions";


export const initialState: TestFeatureState = {
    phase:"",
    name:"",
    gameId:"",
    params:{}
  };
  
export const gameReducer = createReducer(
            initialState,
            on(changeName, (state, action) => {

                let newState = JSON.parse(JSON.stringify(state))

                console.log("newState",newState);
                console.log(action);
                
                
                newState.name = action.item

                return newState
            }),
            on(changeGameId, (state, action) => {

                let newState = JSON.parse(JSON.stringify(state))

                console.log("newState",newState);
                console.log(action);
                
                
                newState.gameId = action.item

                return newState
            }),
            on(changePhase, (state, action) => {

                let newState = JSON.parse(JSON.stringify(state))

                console.log("newState",newState);
                console.log(action);
                
                
                newState.phase = action.item

                return newState
            }),
            on(validerAction, (state, action) => {

                let newState = JSON.parse(JSON.stringify(state))

                console.log("newState",newState);
                console.log(action);
                
                
                newState.name = action.item.name
                newState.gameId = action.item.gameId

                return newState
            }),
            on(loadAction, (state, action) => {

                let newState = JSON.parse(JSON.stringify(state))

                console.log("newState",newState);
                console.log(action);
                
                
                newState.params = action.item

                return newState
            })
)