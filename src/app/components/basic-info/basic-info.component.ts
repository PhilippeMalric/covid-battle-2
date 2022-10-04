import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalService } from 'src/app/global.service';
import { validerAction } from 'src/app/ngrx/basicInfo/basicInfoActions';
import { TestFeatureState } from 'src/app/ngrx/selector';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  nom: any;
  gameID: any;

  constructor(
    private store: Store<TestFeatureState>,
    private globalService : GlobalService,
  ) { }

  ngOnInit(): void {
  }


  valider = ()=>{

    this.store.dispatch(validerAction(
      {item:{name:this.nom,gameId:this.gameID}}))

  }

}
