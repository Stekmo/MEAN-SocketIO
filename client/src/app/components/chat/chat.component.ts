import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import {Chatroom} from "./chatroom";
import {Message} from "./message";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  name: String;
  message: String;
  room: String;
  public chatMessages = [];
  public chatrooms = [];

  constructor(
    private router: Router,
    // private authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getMessages();
    this.getChatrooms();
  }

  sendMsg(){
    const message: Message = {
      name: JSON.parse(localStorage.getItem('user')).name,
      message: this.message
    };

    this.chatService.sendMessage(message).subscribe();
  }

  getMessages(){
    this.chatService.getMessages()
      .subscribe(
        messages => {
          this.chatMessages = messages;
        }
      );
  }

  createRoom(){
    const newChatroom: Chatroom = {
      name: this.room,
      owner: JSON.parse(localStorage.getItem('user')).name
    };
    this.chatService.createRoom(newChatroom).subscribe();
  }

  getChatrooms(){
    this.chatService.getChatrooms()
      .subscribe(
        chatrooms => {
          this.chatrooms = chatrooms;
        }
      )
  }

}
