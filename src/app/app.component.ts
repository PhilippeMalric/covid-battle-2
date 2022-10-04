import { MediaMatcher } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, EnvironmentInjector, Inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Game2Item, GlobalService } from './global.service';
import { testAction } from './ngrx/actions';
import { changeGameId, changeName, validerAction } from './ngrx/basicInfo/basicInfoActions';
import { selectGameState, selectParams, TestFeatureState } from './ngrx/selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('test1', { read: ViewContainerRef }) 
  test1:ViewContainerRef | undefined;
  @ViewChild('dataContainer')

  title = 'Covid-battle-2';


  dataContainer!: ElementRef;
  nomDuFichier: any;
  newid: any;
  currentRonde: number | undefined;
  today2: string;
  nom = ""
  gameID = ""
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  presences :any[] = []
  intoTheLoby = true;
  master: any;



  constructor( 
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    private globalService : GlobalService,
    media: MediaMatcher,
    private store: Store<TestFeatureState>) { 
      this.today2 = this.globalService.today2
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);


    }

  ngOnInit(): void {

    this.currentRonde = 1

    this.store.pipe(select(selectParams)).subscribe((data:any)=>{
      console.log("Params", data);
      if(Object.keys(data).length != 0){
        this.gameID = data.gameId
        if(this.gameID == ""){
          this.intoTheLoby = true
        }else{
          this.intoTheLoby = false
          this.master = data.auteur
        }
        console.log("intoTheLoby",this.intoTheLoby);
        
      }
   
    })




    this.store.pipe(select(selectGameState)).subscribe(
      (data:TestFeatureState)=>{
        
      console.log("Store",data);
      
      this.presences = data.params?.presence

      
      if(this.presences?.indexOf(data.name) == -1){
        console.log("update presence")
        let newTab = [...this.presences,data.name]
        console.log(newTab);
        
        this.globalService.updateMessage(
          {
            presence:newTab
          },data.params.id_firestore).subscribe()

      }


    })


  }
 
  ngAfterViewInit(){
    //console.log("test1",this.test1);


  }

 

  deleteAll = ()=>{
 
  }

  lancerLeJeu = ()=>{

    this.newid = this.globalService.create_Id()
    this.store.pipe(take(1),select(selectGameState))
    .subscribe((data2:TestFeatureState)=>{
      console.log(data2);
       
      this.globalService.createMessageGame(
        {auteur:data2.name,
          gameId:data2.gameId,
          message: "Première ronde",
          type:"game",
          date:this.today2,
          time2:Date.now(),
          ronde:this.currentRonde,
          presence:[data2.name]
        },
        this.newid
    
      ).pipe(take(1)).subscribe()
    })
  }

  checkValues = ()=>{

    this.store.pipe(select(selectParams)).pipe(
      take(1),
    ).subscribe((data:Game2Item)=>{
      console.log("item",data);
      
      const dialogRef = this.dialog.open(OverviewDialog, {
        width: '700px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
       
      });
    })
  }


  updateAuteur = ()=>{
    this.store.pipe(select(selectGameState)).pipe(
      take(1),
    ).subscribe((data:TestFeatureState)=>{
      console.log("test",data);
      
      this.globalService.updateMessage(
        {auteur:data.name},data.params.id_firestore).subscribe()
        }
      )

    }
   

  }

  @Component({
    selector: 'dialog-1',
    templateUrl: 'template/dialogue.html',
  })
  export class OverviewDialog {

    data$:Observable<Game2Item>


    constructor(
      private store: Store<TestFeatureState>,
      public dialogRef: MatDialogRef<OverviewDialog>,
     
    ) {

      this.data$ = this.store.pipe(select(selectParams))

    }

    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }



