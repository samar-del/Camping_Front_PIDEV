import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chatbot-component',
  templateUrl: './chatbot-component.component.html',
  styleUrls: ['./chatbot-component.component.scss']
})
export class ChatbotComponentComponent implements OnInit {
  chatForm: FormGroup;
  chatMessages: { sender: string; message: string }[] = [];
  readonly API_URL = 'http://localhost:8082';
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addBotMessage('Hello! How can I assist you?');
  }

  sendMessage(): void {
    if (this.chatForm.invalid) {
      return;
    }

    const userMessage = this.chatForm.controls['message'].value;
    this.addUserMessage(userMessage);
    this.chatForm.reset();

    this.http.post<any>(`${this.API_URL}/chatbot`, { message: userMessage }).subscribe(response => {
      const botReply = response.reply;
      this.addBotMessage(botReply);
    });
  }

  addUserMessage(message: string): void {
    this.chatMessages.push({ sender: 'You', message });
  }

  addBotMessage(message: string): void {
    this.chatMessages.push({ sender: 'Bot', message });
  }
}
