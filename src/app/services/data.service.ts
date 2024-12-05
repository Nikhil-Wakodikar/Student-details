import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  studentData: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      gender: 'male',
      skills: ['Angular', 'React'],
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '9876543210',
      gender: 'female',
      skills: ['Vue', 'Flutter'],
      address: '456 Elm Street',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001'
    }
  ];

  constructor() { }

  saveStudent(student: Student) {
    return new Promise((resolve, reject) => {
      if (student) {
        this.studentData.push(student);
        resolve(true)
      } else {
        reject(false)
      }
    })
  }
  updateStudentById(id: number, student: Student) {
    let index = this.studentData.findIndex(s => s.id === id)

    return new Promise((resolve, reject) => {
      if (index >= 0) {
        this.studentData[index] = { ...student }
        resolve(true)
      } else {
        reject(false)
      }
    })
  }

  deleteStudentById(id: number) {
    let index = this.studentData.findIndex(s => s.id === id)

    console.log(index);
    return new Promise((resolve, reject) => {
      if (index >= 0) {
        this.studentData.splice(index, 1);
        resolve(true)
      } else {
        reject(false)
      }
    })
  }
  getStudents() {
    return of([...this.studentData])
  }

  getStudentById(id: number) {
    return this.studentData.find(s => s.id === id)
  }
}
