import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public http: HttpClient) { }

  getPosts() {
    return this.http.get(this.apiUrl);
  }

}
