import { Component, OnInit } from '@angular/core';
import Guacamole from 'guacamole-common-js';
import * as CryptoJS from 'crypto-js';  
import encrypt from './encrypt.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Guac-Common-Js';
  encPassword = "";

  ngOnInit() {
    debugger;
    var headers = this.getHeaders();
    var parameter = this.getConnectParam();

    const tunnel = new Guacamole.HTTPTunnel('http://192.168.1.169:8080/guacamole', false, headers);
    //const tunnel = new Guacamole.WebSocketTunnel('ws://192.168.1.169:4200');
    
    var client = new Guacamole.Client(tunnel);
    document.getElementById("guacamoleDiv").appendChild(client.getDisplay().getElement());

    //var token ='token=18BAA6B4999F0D0A302613C582351083911F319547B8A4E179C63180746E5D8E';
    //client.connect('token='+parameter);
    //client.connect("hostname=192.168.1.32&ip=192.168.1.32&type=rdp&username=admin&password=admin");
    client.connect(parameter);
  }

  getConnectParam() {
    // return encrypt({
    //   connection: {
    //     type: 'rdp',
    //     settings: {
    //       hostname: '192.168.1.32',
    //       username: 'Administrator',
    //       password: 'Kottai2050$',
    //       'enable-drive': true,
    //       'create-drive-path': true,
    //       security: 'any',
    //       'ignore-cert': true,
    //       'enable-wallpaper': false,
    //     },
    //   }
    // });
    // return this.convertText(JSON.stringify({
    //   connection: {
    //     type: 'rdp',
    //     settings: {
    //       hostname: '192.168.1.32',
    //       username: 'Administrator',
    //       password: 'Kottai2050$',
    //       'enable-drive': true,
    //       'create-drive-path': true,
    //       security: 'any',
    //       'ignore-cert': true,
    //       'enable-wallpaper': false,
    //     },
    //   }
    // }));
    return {
      hostname: '192.168.1.32',
      username: 'Administrator',
      password: '',
      'enable-drive': true,
      'create-drive-path': true,
      security: 'any',
      'ignore-cert': true,
      'enable-wallpaper': false
    } 
  }

  convertText(conversion) {  
    debugger;
    return "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDYxMzQ4MTIsImV4cCI6MTYwNjE0OTIxMiwiR1VBQ19JRCI6IjIwMDczNjI3NjAiLCJndWFjLmhvc3RuYW1lIjoiMTkyLjE2OC4xLjMyIiwiZ3VhYy5wcm90b2NvbCI6InJkcCIsImd1YWMucG9ydCI6MzM4OSwiZ3VhYy5zZWN1cml0eSI6ImFueSIsImd1YWMuaWdub3JlLWNlcnQiOiJ0cnVlIn0.5vQB1r3zo44gv8mLYDe-O-n-VFQltVfrX70ilIsUenTsL--p1WMcM9ZK9KP677C4jeZiQs8CC-lAvy5a0ihyrQ";
    return CryptoJS.HmacSHA512(conversion, this.encPassword.trim()).toString();  
  }

  getHeaders() {
    return {
      // "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": '*',
      // "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
      // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Access-Control-Allow-Origin,Origin,Accept',
      // "Access-Control-Allow-Credentials": true
    }
  }
}
