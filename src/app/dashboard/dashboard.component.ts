import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import user from '../../assets/sample.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck, AfterViewInit {

  isconfirmModalDisplayed = false;
  isEditModalDisplayed = false;
  mainPage = true;
  editForm: FormGroup;
  progressValue;
  user = user;
  maleUser;
  femaleUser;
  displayedColumns: string[] = ['uname', 'email', 'gender', 'address', 'dob', 'edit', 'delete'];
  dataSource;
  editUser;
  deleteUser;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.editForm = this.fb.group({
      uname: '',
      email: '',
      gender: 'male',
      dob: '',
      address: ''
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngDoCheck() {
    this.progressValue = this.user.length * 10;
    this.maleUser = this.user.filter((ele) => { return ele.gender == 'male' }).length;
    this.femaleUser = this.user.length - this.maleUser;
    this.dataSource = new MatTableDataSource<any>(this.user);
  }

  acceptConfirmModal() {
    this.isconfirmModalDisplayed = false;
    this.isEditModalDisplayed = false;
    this.mainPage = true;
    this.user.splice(this.user.indexOf(this.deleteUser), 1)
    this.dataSource = new MatTableDataSource<any>(this.user);
    this.dataSource.paginator = this.paginator;
  }

  closeModal() {
    this.isconfirmModalDisplayed = false;
    this.isEditModalDisplayed = false;
    this.mainPage = true;
  }

  submitEditModal() {
    this.user.splice(this.user.indexOf(this.editUser), 1)
    this.user.push(this.editForm.value);
    this.mainPage = true;
    this.isEditModalDisplayed = false;
    this.dataSource = new MatTableDataSource<any>(this.user);
    this.dataSource.paginator = this.paginator;
  }

  edit(element) {
    this.isEditModalDisplayed = true;
    this.mainPage = false;
    this.editUser = this.user.filter((ele) => {
      return ele.uname = element.uname
    })[0]


    this.editForm.patchValue({
      uname: this.editUser.uname,
      email: this.editUser.email,
      gender: this.editUser.gender,
      dob: this.editUser.dob,
      address: this.editUser.address
    })
  }

  delete(element) {
    this.isconfirmModalDisplayed = true;
    this.mainPage = false;
    this.deleteUser = this.user.filter((ele) => {
      return ele.uname = element.uname
    })[0]
  }

}
