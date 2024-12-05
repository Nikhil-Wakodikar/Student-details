import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm!: FormGroup

  skillsArray: string[] = ['Angular', 'React', 'Vue', 'Flutter']
  id: number | null = null
  constructor(
    private _fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm()

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '', 10);

    if (this.id) {
      const student = this.dataService.getStudentById(this.id);
      this.studentForm.patchValue({
        ...student,
      });
      const formArray = this.skills;

      formArray.clear();

      student?.skills.forEach((value) => {
        if (this.skillsArray.includes(value)) {
          formArray.push(this._fb.control(value));
        }
      });
    } else {
      this.dataService.getStudents().subscribe((resp: Student[]) => {
        this.studentForm.patchValue({
          id: resp.length + 1
        })
      })
    }
  }

  buildForm() {
    this.studentForm = this._fb.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required]],
      skills: this._fb.array([]),
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get skills() {
    return this.studentForm.get('skills') as FormArray;
  }

  toggleSkill(skill: string, isChecked: boolean) {
    const skillsFormArray = this.skills;
    if (isChecked) {
      skillsFormArray.push(this._fb.control(skill));
    } else {
      const index = skillsFormArray.controls.findIndex(x => x.value === skill);
      skillsFormArray.removeAt(index);
    }
  }


  onSubmit() {
    if (this.studentForm.invalid) return

    if (this.id) {
      this.dataService.updateStudentById(this.id, this.studentForm.value).then(() => {
        this.router.navigate(['/students/details'])
      })
    } else {
      this.dataService.saveStudent({ ...this.studentForm.value }).then(() => {
        this.router.navigate(['/students/details'])
      })
    }
  }
}
