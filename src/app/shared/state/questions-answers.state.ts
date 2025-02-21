import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { QuestionsAnswersService } from "../services/questions-answers.service";
import { Feedback, GetQuestionAnswers, SendQuestion, UpdateQuestionAnswers } from "../action/questions-answers.action";
import { QuestionAnswers } from "../interface/questions-answers.interface";

export class QuestionStateModel {
  question = {
    data: [] as QuestionAnswers[],
    total: 0
  }
}

@State<QuestionStateModel>({
  name: "question",
  defaults: {
    question: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class QuestionAnswersState {

  constructor(private questionsAnswersService: QuestionsAnswersService ) {}

  @Selector()
  static questionsAnswers(state: QuestionStateModel) {
    return state.question;
  }

  @Action(GetQuestionAnswers)
  getQuestionAnswers(ctx: StateContext<QuestionStateModel>, action: GetQuestionAnswers) {
    this.questionsAnswersService.skeletonLoader = true;
    return this.questionsAnswersService.getQuestionAnswers(action.slug).pipe(
      tap({
        next: result => {
          ctx.patchState({
            question: {
              data: result.data,
              total: result?.total ? result?.total : result.data ? result.data.length : 0
            }
          });
        },
        complete:() => {
          this.questionsAnswersService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(SendQuestion)
  sendQuestion(ctx: StateContext<QuestionStateModel>, action: SendQuestion) {
    // Submit Question Logic Here
  }

  @Action(UpdateQuestionAnswers)
  update(ctx: StateContext<QuestionStateModel>, { payload, id }: UpdateQuestionAnswers) {
    // Update Question Logic Here
  }

  @Action(Feedback)
  Feedback(ctx: StateContext<QuestionStateModel>, action: Feedback) {
    const state = ctx.getState();
    const question = [...state.question.data];
    const index = question.findIndex(item => Number(item.id) === Number(action.payload['question_and_answer_id']));

    if(action.type === 'liked' || action.type === 'disliked') {
      const currentReaction = question[index].reaction;
      const newReaction = action.payload['reaction'];
      if (currentReaction === newReaction) {
        if (action.type === 'liked') {
          question[index].total_likes -= 1;
        } else {
          question[index].total_dislikes -= 1;
        }
        question[index].reaction = null;
        action.payload['reaction'] = null
      } else {
        if (currentReaction === 'liked') {
          question[index].total_likes -= 1;
        } else if (currentReaction === 'disliked') {
          question[index].total_dislikes -= 1;
        }
        if (action.type === 'liked') {
          question[index].total_likes += 1;
        } else {
          question[index].total_dislikes += 1;
        }
        question[index].reaction = newReaction;
        action.payload['reaction'] = newReaction
      }
    }

    ctx.patchState({
      ...state,
      question: {
        data: question,
        total: state.question.total
      }
    });
  }
  
}
