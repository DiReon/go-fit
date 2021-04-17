import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit, OnDestroy {
  type: string;
  subscription: Subscription;
  icon = faEdit;
  rows = [];
  temp = [];
  displayedColumns: string[] = ['title', 'complexity', 'category', 'actions'];
  dataSource = new MatTableDataSource(this.rows); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(r => {
      this.type = r['type'];
      console.log("Type: ", this.type);
    }
    )
  }

  ngOnInit(): void {
      this.subscription = this.route.params.pipe(switchMap(params => {
        this.type = params['type']
        return this.sharedService.getAll(this.type)
      })).subscribe(
            response => {
              this.rows = this.temp = response;
              this.dataSource = new MatTableDataSource(this.rows);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              console.log(this.rows);
            })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
