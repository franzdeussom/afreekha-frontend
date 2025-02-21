import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetStoreBySlug } from '../action/store.action';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const StoreResolver: ResolveFn<boolean> = (route, state) => {
  const slug = route.paramMap.get('slug') ? route.paramMap.get('slug') : '';

  if (!slug) {
    // Return false if the slug is not present
    return of(false);
  }

  return inject(Store).dispatch(new GetStoreBySlug(slug)).pipe(
    map(() => true), // Emit true if dispatch is successful
    catchError(() => of(false)) // Emit false on error
  );
};
