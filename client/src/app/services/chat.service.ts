import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Message } from "../components/chat/message";
import * as io from 'socket.io-client';
import {Chatroom} from "../components/chat/chatroom";

@Injectable()
export class ChatService {

  constructor(
    private http: Http
  ) { }
  private socket;
  private url = window.location.origin;

  sendMessage(message){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/chat/send-message', message, {headers: headers})
      .map(res => res.json());
  }

  getMessages(): Observable<Message[]>{
    let observable = new Observable(observer => {
      console.log("Socket", this.url);
      this.socket = io(this.url);
      this.socket.on('refresh messages', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  createRoom(room){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/chat/create-chatroom', room, {headers: headers})
      .map(res => res.json());
  }

  getChatrooms():Observable<Chatroom[]>{
    let chatroomsList = new Observable(observer => {
      console.log("Socket", this.url);
      this.socket = io(this.url);
      this.socket.on('refresh chatrooms', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return chatroomsList;
  }

}
