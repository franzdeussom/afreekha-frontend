import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { QnAModel } from '../interface/questions-answers.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getQuestionAnswers(slug: Params): Observable<QnAModel> {
    return this.http.get<QnAModel>(`${environment.URL}/questions.json`,  { params: slug });
  }

}
