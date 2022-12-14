// this connects to our api

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { AddStudentRequest } from '../models/ui-models/add-student-request.model';
import { UpdateStudentRequest } from '../models/ui-models/update-student-request.model'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44375';

  constructor(private httpClient: HttpClient) { }

  // so that it will return an Observable of type student
  getStudents(): Observable<Student[]> {
    // this is the url of your API route
   return this.httpClient.get<Student[]>(this.baseApiUrl + '/api/students');
  }

  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/api/students/' + studentId);
  }

  // UpdateStudentRequest is the UI-model of the UpdateStudentRequestDto in the API
  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    // maps Student (main model/API) to UpdateStudentRequestDto (dto/ui-model)
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    // make a request to the api
    return this.httpClient.put<Student>(this.baseApiUrl + '/api/students/' + studentId, updateStudentRequest)
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/api/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.post<Student>(this.baseApiUrl + '/api/students/add', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    // dapat same yung name ng "" sa nasa API
    formData.append("profileImage", file);

    return this.httpClient.post(this.baseApiUrl + '/api/students/' + studentId + '/upload-image', formData, {
      responseType: 'text' // kasi di siya json format
    });
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }

}
