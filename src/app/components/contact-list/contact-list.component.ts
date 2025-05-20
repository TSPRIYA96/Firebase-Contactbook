import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getContacts();
  }

 deleteContact(id: string): void {  // Changed number to string
  if (confirm('Are you sure you want to delete this contact?')) {
    this.contactService.deleteContact(id);
    this.contacts$ = this.contactService.getContacts();
  }
}
  }

