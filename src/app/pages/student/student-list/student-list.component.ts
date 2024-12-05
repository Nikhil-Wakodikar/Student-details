import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  studentData = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['Name', 'email', 'Phone Number', 'gender', 'actions'];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents() {
    this.dataService.getStudents().subscribe((resp: Student[]) => {
      this.studentData.data = resp || [];
    });
  }

  editStudent(id: number) {
    this.router.navigate([`/students/edit/${id}`])
  }
  deleteStudent(id: number) {
    this.dataService.deleteStudentById(id).then(() => {
      this.getStudents()
    })
  }
}
