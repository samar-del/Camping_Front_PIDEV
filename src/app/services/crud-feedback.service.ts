import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CrudFeedbackService {

  readonly API_URL = 'http://localhost:8082/feedbacks';

  constructor(private httpClient: HttpClient) {
  }

  getAllFeedbacks() {
    return this.httpClient.get(`${this.API_URL}`)
  }

  getAllFeedbacksByActiviteId(activiteId: any) {
    return this.httpClient.get(`${this.API_URL}/{activiteId}`)
  }

  addFeedback(feedback: any) {
    return this.httpClient.post(`${this.API_URL}`, feedback)
  }

  editFeedback(feedback: any) {
    return this.httpClient.put(`${this.API_URL}`, feedback)
  }

  deleteFeedback(idFeedback: any) {
    return this.httpClient.delete(`${this.API_URL}/${idFeedback}`)
  }

  getAllUsers() {
    return this.httpClient.get(`${this.API_URL}/users`)
  }
}
