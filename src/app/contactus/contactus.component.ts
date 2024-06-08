import { Component, OnInit } from '@angular/core';
import {ContactService} from '../services/contact/contact.service';
import {ToastrService} from 'ngx-toastr';
import {ContactDTO} from '../services/contact/contactDTO';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  form: any = {};
  private contactInfo: ContactDTO;
  public isLoading: boolean = false;

  constructor(private contactService: ContactService, private toastr: ToastrService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  onSubmit(): void {
    this.contactInfo = new ContactDTO(
      this.form.firstName,
      this.form.lastName,
      this.form.email,
      this.form.phones,
      this.form.message
    );

    this.isLoading= true;
    this.contactService.saveContact(this.contactInfo).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success(`Вы успешно отправили запрос`, 'Успешно отправлено');
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error(`Ошибка отправки: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
      }
    });
  }
}
