import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  apiUrl='http://localhost:3000/todolist';
  
  constructor(private _http:HttpClient,private http: HttpClient) { }

     // Get Method For All list
     getList()
     {
       return this._http.get<any>("http://localhost:3000/todolist").pipe(map((res:any)=> {
         return res
       }))
     }


      // Post Method For Add list
  postList(data:any)
  {
    return this._http.post("http://localhost:3000/todolist",data).pipe(map((res:any)=> {
      return res
    }))
  }

     //Get Method list by id
     getListbyid(id:any):Observable<any>
     {
       let ids=id;
       return this._http.get("http://localhost:3000/todolist/",ids);
        
       }


        // Put Method For Update List
     putList(data:any, id:any)
     {
     return this._http.put<any>("http://localhost:3000/todolist/" + id,data).pipe(map((res:any)=> {
      return res
     }))
      }


          // Delete list by id
  deleteList(id:any):Observable<any>{
    return this._http.delete(`${this.apiUrl}/${id}`).pipe(map((res:any)=> {
      return res
     }))
    }


         // Delete ALL Method For Update list
  deleteAllListt():Observable<any>{
    return this._http.delete("http://localhost:3000/todolist");
    }

}
