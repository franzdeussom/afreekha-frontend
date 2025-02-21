import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NotificationService } from "../services/notification.service";
import { ReviewService } from "../services/review.service";
import { Review } from "../interface/review.interface";
import { GetReview, SendReview, UpdateReview } from "../action/review.action";

export class ReviewStateModel {
  review = {
    data: [] as Review[],
    total: 0
  }
}

@State<ReviewStateModel>({
  name: "review",
  defaults: {
    review: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class ReviewState {

  constructor(private reviewsService: ReviewService ) {}

  @Selector()
  static review(state: ReviewStateModel) {
    return state.review;
  }

  @Action(GetReview)
  getReview(ctx: StateContext<ReviewStateModel>, action: GetReview) {
    return this.reviewsService.getReview(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            review: {
              data: result.data,
              total: result?.total ? result?.total : result.data ? result.data.length : 0
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(SendReview)
  sendReview(ctx: StateContext<ReviewStateModel>, action: SendReview) {
    // Submit Review Logic Here
  }

  @Action(UpdateReview)
  update(ctx: StateContext<ReviewStateModel>, { payload, id }: UpdateReview) {
    // Update Review Logic Here
  }

}
