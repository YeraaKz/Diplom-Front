import {Component, OnInit} from '@angular/core';

import { UserService } from '../services/user/user.service';
import {UserRequest} from '../services/user/user-request';
import {UserUpdateDTO} from '../services/user/user-update.dto';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: UserRequest[] = [];
  userUpdateDTO: UserUpdateDTO = new UserUpdateDTO();
  public isLoading: boolean = true;

  constructor(private userService: UserService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // tslint:disable-next-line:typedef
  deleteUser(userId: number) {
    this.isLoading = true;
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.fetchUsers();
        this.isLoading = false;
        this.toastr.info('User deleted successfully');
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Error deleting user:', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.isLoading = false;
        this.toastr.info('Successfully fetching users');
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Error fetching users:', error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  saveChanges() {
    this.isLoading = true;
    this.userService.saveUser(this.userUpdateDTO)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.info('User saved successfully:', response);
          this.userUpdateDTO = new UserUpdateDTO();
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Error saving user:', error);
        }
      );
  }
}
