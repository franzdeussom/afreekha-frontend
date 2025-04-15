import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompareModel } from '../interface/compare.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  public skeletonLoader: boolean = false;
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getCompareItems(): Observable<CompareModel> {
    if (isPlatformBrowser(this.platformId)) {
      const compare = localStorage.getItem('compare') ? localStorage.getItem('compare') as string : undefined;
      return compare ? of(JSON.parse(compare) as CompareModel) : of({ data: [], total: 0 } as CompareModel);
    } else {
      // Retournez une valeur par défaut si vous êtes côté serveur
      return of({ data: [], total: 0 } as CompareModel);
    }
  }

  saveCompare(compare: CompareModel) {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('compare')) {
        localStorage.setItem('compare', JSON.stringify(compare));
      } else {
        localStorage.removeItem('compare');
        localStorage.setItem('compare', JSON.stringify(compare));
      }
    }
  }
}
