import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetBlogBySlug } from '../action/blog.action';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const BlogResolver: ResolveFn<boolean> = (route, state) => {
  const slug = route.paramMap.get('slug');

  if (!slug) {
    // Return false or handle the missing slug case
    return of(false);
  }

  return inject(Store).dispatch(new GetBlogBySlug(slug)).pipe(
    map(() => true), // Return true if dispatch is successful
    catchError(() => of(false)) // Return false on error
  );
};
