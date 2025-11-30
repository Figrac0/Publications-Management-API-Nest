import { Injectable, NotFoundException } from '@nestjs/common';
import { Publication } from './publication.interface';
import { CreatePublicationDto } from './create-publication.dto';
import { UpdatePublicationDto } from './update-publication.dto';

@Injectable()
export class PublicationsService {
  private publications: Publication[] = [];
  private nextId = 1;

  findAll(author?: string): Publication[] {
    if (author) {
      return this.publications.filter((p) => p.author === author);
    }
    return this.publications;
  }

  findOne(id: number): Publication {
    const publication = this.publications.find((p) => p.id === id);
    if (!publication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
    return publication;
  }

  create(dto: CreatePublicationDto, userId: string): Publication {
    const publication: Publication = {
      id: this.nextId++,
      title: dto.title,
      author: dto.author,
      year: dto.year,
      createdBy: userId,
    };

    this.publications.push(publication);
    return publication;
  }

  update(id: number, dto: UpdatePublicationDto): Publication {
    const publication = this.findOne(id);

    if (dto.title !== undefined) {
      publication.title = dto.title;
    }
    if (dto.author !== undefined) {
      publication.author = dto.author;
    }
    if (dto.year !== undefined) {
      publication.year = dto.year;
    }

    return publication;
  }

  remove(id: number): void {
    const index = this.publications.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
    this.publications.splice(index, 1);
  }
}
