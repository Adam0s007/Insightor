import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async createContact(data: CreateContactDto): Promise<ContactEntity> {
    const contact = this.contactRepository.create(data);
    await this.contactRepository.save(contact);
    return contact;
  }
}
