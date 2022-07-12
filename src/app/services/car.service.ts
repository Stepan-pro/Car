import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {urls} from "../contants/urls";
import {ICars} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {
  }

  create(car:ICars):Observable<ICars>{
    return this.httpClient.post<ICars>(urls.cars, car)
  }

  getAllCars(): Observable<ICars[]> {
    return this.httpClient.get<ICars[]>(urls.cars)
  }

  getById(id:string): Observable<ICars>{
    return this.httpClient.get<ICars>(`${urls.cars}/${id}`)
  }

  deleteById(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${urls.cars}/${id}`)
  }

  updateById(id:string, carForUpdate: Partial<ICars> ): Observable<ICars>{
    return this.httpClient.patch<ICars>(`${urls.cars}/${id}`, carForUpdate)
  }


}

