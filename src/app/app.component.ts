import { Component, OnInit } from '@angular/core';
import Guacamole from 'guacamole-common-js';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Guac-Common-Js';
  encPassword = "secure string for encryption needs to be high";

  ngOnInit() {
    debugger;
    var headers = this.getHeaders();
    //const tunnel = new Guacamole.HTTPTunnel('http://192.168.1.169:8080/guacamole', true, headers);
    const tunnel = new Guacamole.WebSocketTunnel('http://192.168.1.169:8080/');

    var client = new Guacamole.Client(tunnel);
    document.getElementById("guacamoleDiv").appendChild(client.getDisplay().getElement());

    var parameter = this.getConnectParam();
    //client.connect('token='+parameter);
    client.connect(parameter);
  }

  getConnectParam() {
    return this.convertText(JSON.stringify({
      connection: {
        type: 'rdp',
        settings: {
          hostname: '192.168.1.32',
          username: 'Administrator',
          password: 'Kottai2050$',
          'enable-drive': true,
          'create-drive-path': true,
          security: 'any',
          'ignore-cert': true,
          'enable-wallpaper': false,
        },
      }
    }));
  }

  convertText(conversion) {  
    debugger;
    //return "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU4Njk2MzUsImV4cCI6MTYwNTg3NjgzNSwiR1VBQ19JRCI6IjIwMTY2Nzc5NTEiLCJndWFjLmhvc3RuYW1lIjoiMTkyLjE2OC4xLjMyIiwiZ3VhYy5wcm90b2NvbCI6InJkcCIsImd1YWMucG9ydCI6MzM4OSwiZ3VhYy51c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJndWFjLnBhc3N3b3JkIjoiS290dGFpMjA1MCQiLCJndWFjLmlnbm9yZS1jZXJ0IjoidHJ1ZSJ9.9_4H8dola5a6TrAhkdBiGehXB-QcxVsgEQsSSGOcZJLWi2SVnQtFwv5SylUsWyZZSkJnqfr7VjOWAAC77-PlkQ";
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
