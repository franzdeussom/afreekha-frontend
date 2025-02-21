import { Component, Output, EventEmitter, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent, Select2Module } from 'ng-select2-component';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-collection-sort',
    templateUrl: './collection-sort.component.html',
    styleUrls: ['./collection-sort.component.scss'],
    standalone: true,
    imports: [Select2Module, TranslateModule]
})
export class CollectionSortComponent {

  @Input() filter: Params;
  @Input() gridCol: string;

  @Output() setGridClass: EventEmitter<string> = new EventEmitter();
  @Output() showFilter: EventEmitter<boolean> = new EventEmitter();

  public isBrowser: boolean;

  public sorting: Select2Data = [{
      value: 'asc',
      label: 'Ascending Order',
    },{
      value: 'desc',
      label: 'Descending Order',
    },{
      value: 'low-high',
      label: 'Low - High Price',
    },{
      value: 'high-low',
      label: 'High - Low Price',
    },{
      value: 'a-z',
      label: 'A - Z Order',
    },{
      value: 'z-a',
      label: 'Z - A Order',
    },{
      value: 'discount-high-low',
      label: '% Off - Hight To Low',
    }];

  public selectedGrid: string = "collection_4_grid";
  public class: string = "row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section";
  public gridArray = ['collection_3_grid', 'collection_4_grid', 'collection_5_grid', 'collection_list_view']
  constructor(private route: ActivatedRoute, private attributeService: AttributeService,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object,) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.setGridClass.emit(this.class);
  }

  ngOnChanges(changes: SimpleChanges) {
    let layout = changes['filter']?.currentValue.layout;
    let gridCol = changes['gridCol']?.currentValue
     if(this.gridArray.includes(gridCol)){
      this.selectedGrid = String(this.grid(gridCol))
    }

    if(this.gridArray.includes(layout)){
      this.grid(layout);
    }
  }

  grid(value: string) {
    if(this.gridArray.includes(value)){
      if(value == 'collection_3_grid')
       this.class = "row g-sm-4 g-3 product-list-section row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2";
      else if(value == 'collection_4_grid')
       this.class = "row g-sm-4 g-3 product-list-section row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2";
      else if(value == 'collection_5_grid')
        this.class = "row g-sm-4 g-3 product-list-section row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2";
      else if(value == 'collection_list_view')
       this.class = "row g-sm-4 g-3 product-list-section row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 list-style";

      this.selectedGrid = value;
      this.setGridClass.emit(this.class);
    }
  }

  // SortBy Filter
  sortByFilter(data: Select2UpdateEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: data && data.value ? data.value : null,
        field: data && (data.value == 'asc' || data.value == 'desc') ? 'created_at' : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  openOffCanvasMenu() {
    this.attributeService.offCanvasMenu = true;
  }

  openFilter(value: boolean){
    this.attributeService.offCanvasMenu = value;
  }

}
