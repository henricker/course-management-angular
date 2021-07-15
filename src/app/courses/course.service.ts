import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./Course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private basePathBackend: string = 'http://localhost:3333/courses';

  constructor(
    private httpClient: HttpClient
  ) { };

  retrieveAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.basePathBackend);
  }

  retrieveById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.basePathBackend}/${id}`)
  }

  save(course: Course): Observable<Course> {
    if(course.id)
      return this.httpClient.put<Course>(`${this.basePathBackend}/${course.id}`, course);
    return this.httpClient.post<Course>(`${this.basePathBackend}`, course);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete(`${this.basePathBackend}/${id}`);
  }
}

