import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookstoreService } from '../services/bookstore.service';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  bookForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    author: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
    pdf: new FormControl('', [
      Validators.required,
    ]),
    category: new FormControl('', [
      Validators.required,
    ])
  });
  constructor(private storage: AngularFireStorage,
    private bookServie: BookstoreService,
    public toast: ToastrService) { }

  ngOnInit(): void {
    this.getBooks();
  }
  imageFile;
  pdfFile;
  handleFileInput1(event) {
    console.log(event[0])
    const file = event[0].name;
    this.imageFile = event[0];
    // const path = `book_image/${file}`;
    // const ref = this.storage.ref(path);
    // this.storage.upload(path, event[0])
    //           .then(response => {
    //            ref.getDownloadURL().toPromise().then(url => {
    //              console.log(url);

    //            })

    //           })
  }

  handleFileInput2(event) {
    console.log(event[0])
    this.pdfFile = event[0];
    console.log("idhgwe",this.pdfFile);
    
    // const path = `book_image/${file}`;
    // const ref = this.storage.ref(path);
    // this.storage.upload(path, event[0])
    //           .then(response => {
    //            ref.getDownloadURL().toPromise().then(url => {
    //              console.log(url);

    //            })

    //           })
  }


  addToStorage1(){
    const path1 = `book_image/${this.imageFile.name}`;
    const ref1 = this.storage.ref(path1);
    this.storage.upload(path1, this.imageFile)
    .then(response => {
      ref1.getDownloadURL().toPromise().then(url => {
        this.bookForm.value.image = url;
        this.addToStorage2()
      })
    })

  }
  addToStorage2(){
    const path2 = `book_pdf/${this.pdfFile.name}`;
    const ref2 = this.storage.ref(path2);
  this.storage.upload(path2, this.pdfFile)
    .then(response => {
      ref2.getDownloadURL().toPromise().then(url => {
        this.bookForm.value.pdf = url;
        this.addBook();
      }).catch(err => {
        this.toast.error("something went wrong")
      })
    })
  }
  addBook() {
        this.bookServie.addBook(this.bookForm.value,uuid.v4()).subscribe(res => {
          console.log("res",res);
          
        });
        this.toast.success("Add Successfully");
  }
 
  books;
  getBooks(){
    this.bookServie.getBooks().subscribe(res => {
      console.log("res",res);
      this.books=res;
    })
  }
  editBook(){

  }

  deleteBook(book){
    this.bookServie.deleteBook(book["_id"]).subscribe(res => {
      //todo
    });
    this.toast.success("deleted Suesfully");
  }
}
