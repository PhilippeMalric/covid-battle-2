import { Injectable, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, concatMap, from, map, Observable, take } from 'rxjs';
import { loadAction } from './ngrx/actions';
import { TestFeatureState } from './ngrx/selector';


export interface Game2Item  {

  time:number
  time2:number
  seqNo:number,
  type:string,
  message:any,
  auteur:string
  seconde:number,
  deleted:boolean,
  date:string,
  gameId:string,
  index:number,
  gameParam:any,
  ronde:number,
  id_firestore:string,
  presence:string[]
}


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

svg_text = ""

elementRef1 : BehaviorSubject<TemplateRef<any>|any> | any
  gameId = "";
  items$: Observable<unknown[]>;
  gameDocSub: any;
  today2: string;
  
  constructor(

    private store: Store<TestFeatureState>,
    private afs: AngularFirestore) {

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
  
      this.today2 = yyyy  + '-' + mm + '-' + dd;
  
      this.items$ = from([])
      
    }






        getItemsGame = ():any=>{

          return this.afs.collection("GameID-"+this.gameId)
                  .valueChanges()
      
        }
      
        getItemsGameByGameId = (data:any)=>{
          console.log("getItemsGameByGameId",data);
          let params =  data[0].gameState
          let gameId = data[0].item.gameId
          let name = data[0].item.name
          console.log(this.gameDocSub);

          if(this.gameDocSub){
            this.gameDocSub.unsubscribe()
          }

          this.gameDocSub = this.afs.collection("GameID-"+gameId)
          .valueChanges().subscribe((data2:any)=>{

            console.log();
            
            if(data2.length > 0){
              this.store.dispatch(loadAction({item:data2[0]})) 
             }
             else{
              let f_id = this.create_Id()
              let item =  {
                  auteur:name,
                  gameId:gameId,
                  message: "",
                  type:"game",
                  date:this.today2,
                  time2:Date.now(),
                  ronde:1,
                  presence:[name]
                }
                this.createMessageGame(item,f_id).subscribe()
             }
       

          })

         
      
        }
      
        createMessageGame(newMessage: Partial<Game2Item>, messageid:string) {

          
          console.log("createMessageGame",newMessage,messageid)
      
          const message = {
            ...newMessage,
            id_firestore:messageid
          }
          let save$: Observable<any>;
      
          save$ = from(this.afs.doc(`GameID-${newMessage.gameId}/${messageid}`).set(message));
      
      
      
          return save$
              .pipe(
                  map(res => {
                      return {
                          id: messageid ?? res.id,
                          ...message
                      }
                  })
              );
          }
      
          deleteAllMessage(ids:string[]) {
            console.log("deleteAllMessageGame All" ,ids)
            const batch = this.afs.firestore.batch()
      
            for(let id of ids){
              const myRef = this.afs.doc(`GameID-${this.gameId}/${id}`).ref
              console.log("REf : ",myRef);
      
              batch.delete(myRef)
      
            }
            return from(batch.commit())
        }
      

        deleteMessage(messageid:string) {
          console.log("deleted" ,messageid)
          return from(this.afs.doc(`GameID-${this.gameId}/${messageid}`).delete());
      }

        create_Id = ()=>{

          return this.afs.createId()
        }



    updateMessage( changes: Partial<Game2Item>,
                   messageid:string):Observable<any> {

     return this.store.pipe(take(1),concatMap((data:any)=>{

        console.log(`GameID-${data.gameState.gameId}/${messageid}`);
                    
        return from(this.afs.doc(
          `GameID-${data.gameState.gameId}/${messageid}`)
        .update(changes));

        
      }))
      
  }


}
