import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { QuoteService } from '../services/quote.service';
import { QuoteFile } from '../models/quote-file.model';
<<<<<<< HEAD

import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';

import { ConfirmComponent } from '../confirm/confirm.component';

=======
>>>>>>> c73f0b2e2598032f4ce2642a2f75601315d2ed3a

@Component({
  selector: 'app-quote-preview',
  templateUrl: './quote-preview.component.html',
  styleUrls: ['./quote-preview.component.css']
})

export class QuotePreviewComponent implements OnInit {
  currentQuote: { [id: string]: any; } = [];
  currentQuoteObj;
  getQuote;
  feed: FirebaseListObservable<QuoteFile[]>;
  subscription: Subscription;
  user: Observable<firebase.User>;
  dialogRef: MdDialogRef<ConfirmComponent>;
  getUserData: any;
  userData: any = {};
  userId: string;
  quote;
  jobId;
  compTitle;
  text: string;
  quotes;
  quoteNumbers: any = [];
  foo: any;

<<<<<<< HEAD
  constructor(private af: AngularFireAuth, private route: ActivatedRoute,
    private router: Router, private quoteService: QuoteService,
    private authService: AuthService, public dialog: MdDialog) {
=======
  constructor(
    private af: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService,
    private authService: AuthService
  ) {
>>>>>>> c73f0b2e2598032f4ce2642a2f75601315d2ed3a
    this.jobId = this.route.snapshot.params.quote_num;
    this.getQuote = this.quoteService.getQuoteById(this.jobId);
    this.compTitle = this.jobId + ' PREVIEW';

    this.getQuote.subscribe(snapshots => {
      this.currentQuote = [];
      this.currentQuoteObj = {};
      snapshots.forEach(snapshot => {
        const tempVal = snapshot.val();
        const tempKey = snapshot.key;
        this.currentQuote[tempKey] = tempVal;
        this.currentQuoteObj[tempKey] = tempVal;
      });
    });

    this.foo = this.quoteService.getQuoteNumbers();

    this.foo.subscribe(snapshots => {
      this.quotes = snapshots.slice();
      // console.log(this.quotes[1].key)
      for (let i = 0; i < this.quotes.length; i++) {
        const tempKey = this.quotes[i].key;
        this.quoteNumbers.push(tempKey);
        // console.log(this.quoteNumbers)
      }
    });
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        // this.userEmail = user.email;
        this.userId = user.uid;
        // console.log(this.userId)

        this.getUserData = this.authService.getUserData(this.userId);
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
            // console.log(this.userData)
          });
        });
      }
    });
  }

  copyToClipboard(elementId) {
    // Create an auxiliary hidden input
    const aux = <HTMLInputElement>document.createElement('input');
    const elm: any = <HTMLElement>document.getElementById(elementId);
    const text = elm.innerHTML;
    // Get the text from the element passed into the input
    aux.setAttribute('value', text);
    // Append the aux input to the body
    document.body.appendChild(aux);
    // Highlight the content
    aux.select();
    // Execute the copy command
    document.execCommand('copy');
    // Remove the input from the body
    document.body.removeChild(aux);
  }

  moveToPending() {
    const temp = this.quoteService.updateStage(this.jobId, 'pending');
  }

  moveToCompleted() {
    const temp = this.quoteService.updateStage(this.jobId, 'completed');
  }

  moveToRequested() {
    const temp = this.quoteService.updateStage(this.jobId, 'requested');
  }
 
  // repeatOrder(event) {
  //   // Add confirmation service here
  //   const quoteNum = this.createQuoteNumber(this.quoteNumbers);
  //   const copyQuote = this.currentQuoteObj;
  //   copyQuote.stage = 'requested';
  //   copyQuote.date = 'Direct reprint';
  //   this.quoteService.submitQuote(copyQuote, quoteNum);
  //   console.log('Order repeated!')
  //   this.router.navigate(['/quote-management']);
  // }

  repeatOrder(event) {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to <b>repeat</b> order?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const quoteNum = this.createQuoteNumber(this.quoteNumbers);
        const copyQuote = this.currentQuoteObj;
        copyQuote.stage = 'requested';
        copyQuote.date = 'Direct reprint';
        this.quoteService.submitQuote(copyQuote, quoteNum);
        console.log('Order repeated!');
        this.router.navigate(['/quote-management']);
      }
      this.dialogRef = null;
    });
  }

  editOrder(event) {
    this.router.navigate(['/edit-form/' + this.jobId]);
    // console.log("Editing order!")
  }

  createQuoteNumber(array) {
    const lastNumberPos = array.length - 1;
    const tempNumber = Number(array[lastNumberPos]) + 1;
    const newNumber = this.pad(tempNumber, 6);
    return newNumber;
  }

  pad(num, size) {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  }

}
