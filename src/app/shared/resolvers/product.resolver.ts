import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProductBySlug } from '../action/product.action';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const ProductResolver: ResolveFn<boolean> = (route, state) => {
  const slug = route.paramMap.get('slug');

  if (!slug) {
    // If no slug is present, return false
    return of(false);
  }

  return inject(Store).dispatch(new GetProductBySlug(slug)).pipe(
    map(() => true), // Return true if the dispatch is successful
    catchError(() => of(false)) // Return false if there's an error
  );
};
