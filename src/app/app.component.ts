import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpDetails } from './modal/Details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  EmployeeForm: FormGroup = new FormGroup({});
  empObj: EmpDetails = new EmpDetails();
  employeeList: EmpDetails[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.EmployeeForm = new FormGroup({
      empId: new FormControl(this.empObj.empId),
      name: new FormControl(this.empObj.name),
      city: new FormControl(this.empObj.city),
      state: new FormControl(this.empObj.state),
      emailId: new FormControl(this.empObj.emailId),
      contactNo: new FormControl(this.empObj.contactNo),
      address: new FormControl(this.empObj.address),
      pincode: new FormControl(this.empObj.pincode),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.EmployeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.EmployeeForm.value);
    } else {
      this.employeeList.push(this.EmployeeForm.value);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
    this.EmployeeForm.reset(); 
  }

  onEdit(item: EmpDetails) {
    this.empObj = item;
    this.createForm();
  }

  onDelete(empId: number) {
    this.employeeList = this.employeeList.filter(emp => emp.empId !== empId);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  }

  onReset() {
    this.EmployeeForm.reset();
  }

  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId === this.EmployeeForm.controls['empId'].value
    );
    if (record !== undefined) {
      record.name = this.EmployeeForm.controls['name'].value;
      record.emailId = this.EmployeeForm.controls['emailId'].value;
      record.empId = this.EmployeeForm.controls['empId'].value;
      record.city = this.EmployeeForm.controls['city'].value;
      record.state = this.EmployeeForm.controls['state'].value;
      record.contactNo = this.EmployeeForm.controls['contactNo'].value;
      record.address = this.EmployeeForm.controls['address'].value;
      record.pincode = this.EmployeeForm.controls['pincode'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.empObj = new EmpDetails();
    this.createForm(); // Reset the form after updating
  }
}
