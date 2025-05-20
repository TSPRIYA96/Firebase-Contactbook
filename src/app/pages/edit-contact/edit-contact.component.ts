import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: Contact = { id: 0, name: '', email: '', phone: '' };

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    this.router.navigate(['/']);
    return;
  }

  // Call the function with id, then subscribe to the Observable it returns
  this.contactService.getContactById(id).subscribe((contact: Contact | undefined) => {
    if (contact) {
      this.contact = { ...contact };
    } else {
      this.router.navigate(['/']);
    }
  });
}

  onUpdateContact(updatedContact: Contact): void {
    this.contactService.updateContact(updatedContact);
    this.router.navigate(['/']);
  }
}