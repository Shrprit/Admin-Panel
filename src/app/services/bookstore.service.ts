import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookstoreService {

  constructor(public http:HttpClient) { }


  addBook(body,id){
    let data = {
      _id : id,
      name: body.name,
      author: body.author,
      img: body.image,
      pdf: body.pdf,
      description: body.description,
      category: body.category,
    }
    console.log("data",data);
    
    return this.http.post(`${environment.api.insertBook}`,data);

  }
  getBooks(){
    return this.http.get(`${environment.api.getBooks}`);
  }
  deleteBook(id){
    return this.http.post(`${environment.api.deleteBook}?_id=${id}`,{});
  }
}
