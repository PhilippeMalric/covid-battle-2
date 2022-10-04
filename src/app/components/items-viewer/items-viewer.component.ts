import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { tap } from 'rxjs/operators';
import { Game2Item, GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss']
})
export class ItemsViewerComponent implements OnInit {

  @Output() change: EventEmitter<Game2Item> = new EventEmitter<Game2Item>();
  @Input() items : any

  gridByBreakpoint:any = { xl: 8, lg: 6, md: 4, sm: 2, xs: 1 }
  @ViewChild('grid') grid: any;
  newid: any;


  constructor(
    private globalService : GlobalService,
    private observableMedia:  MediaObserver) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().pipe(
    tap(change => {
      //console.log(change);
      if(this.grid){
        this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
      }
    })).subscribe()
  }

  delete(e:Game2Item){

    this.globalService.deleteMessage(e.id_firestore).subscribe()

  }



}
