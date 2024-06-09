import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../services/user/userDTO";
import {UserService} from "../services/user/user.service";
import {UserUpdateDTO} from "../services/user/user-update.dto";
import * as jquery from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {

  users: UserDTO[] = [];
  selectedUser: UserUpdateDTO = { id: 0, username: '', email: '', password: '', roles: [] };
  allRoles = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'];
  isEditing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  selectUser(user: UserDTO) {
    this.selectedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password || '', // Используем текущий пароль или пустую строку
      roles: user.roles.map(role => role.name) // Преобразуем роли в массив строк
    };
    this.isEditing = true;
    $('#userModal').modal('show'); // Используйте jQuery для открытия модального окна
  }

  openCreateUserModal() {
    this.isEditing = false;
    this.selectedUser = { id: 0, username: '', email: '', password: '', roles: [] };
    $('#userModal').modal('show'); // Используйте jQuery для открытия модального окна
  }

  createUser() {
    if (this.validateUser(this.selectedUser)) {
      this.userService.saveUser(this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.clearSelection();
        $('#userModal').modal('hide'); // Закрываем модальное окно после сохранения
      });
    }
  }

  updateUser() {
    if (this.validateUser(this.selectedUser)) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.clearSelection();
        $('#userModal').modal('hide'); // Закрываем модальное окно после обновления
      }, error => {
        console.error('Update failed', error);
      });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  clearSelection() {
    this.selectedUser = { id: 0, username: '', email: '', password: '', roles: [] };
    $('#userModal').modal('hide'); // Закрываем модальное окно после обновления
    this.isEditing = false;
  }

  validateUser(user: UserUpdateDTO): boolean {
    if (!user.username || user.username.length < 2 || user.username.length > 100) {
      console.error('Invalid username');
      return false;
    }
    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
      console.error('Invalid email');
      return false;
    }
    if (!user.password) {
      console.error('Password is required');
      return false;
    }
    return true;
  }
}
