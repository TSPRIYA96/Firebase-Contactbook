import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private firestore: Firestore) {}

  getContacts(): Observable<Contact[]> {
    const contactsRef = collection(this.firestore, 'contacts');
    return collectionData(contactsRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  getContactById(id: string): Observable<Contact | undefined> {
    const contactDocRef = doc(this.firestore, `contacts/${id}`);
    return docData(contactDocRef, { idField: 'id' }) as Observable<Contact | undefined>;
  }

  async addContact(contact: Contact): Promise<void> {
    const contactsRef = collection(this.firestore, 'contacts');
    await addDoc(contactsRef, contact);
  }

  async updateContact(contact: Contact): Promise<void> {
    const contactRef = doc(this.firestore, `contacts/${contact.id}`);
    await updateDoc(contactRef, { 
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  async deleteContact(id: string): Promise<void> {
    const contactRef = doc(this.firestore, `contacts/${id}`);
    await deleteDoc(contactRef);
  }
}
