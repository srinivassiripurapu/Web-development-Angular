import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { delay } from 'rxjs/operators';
import {Observable, of } from 'rxjs';

import {HttpClient , HttpHeaders} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
 import {ProcessHTTPMsgService} from './process-httpmsg.service';


 
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders():  Observable<Leader[]> {
   
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership')
       .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
   
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
       .pipe(catchError(this.processHTTPMsgService.handleError));

  }
    
  getFeaturedLeader(): Observable<Leader> {
   
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
 
  }
  getleaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)));
  }
    
   
  }

