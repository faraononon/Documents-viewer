import { Injectable } from '@angular/core';
import { DocumentDto, DocumentPageDto } from '../dtos/document.dto';
import { DocumentModel, DocumentPageModel } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentMapperService {
  public mapToModel(dto: DocumentDto): DocumentModel {
    return {
      name: dto.name,
      pages: this.mapPagesToModel(dto.pages),
    };
  }

  private mapPagesToModel(pagesDto: DocumentPageDto[]): DocumentPageModel[] {
    return pagesDto.map((pageDto) => ({
      number: pageDto.number,
      imageUrl: pageDto.imageUrl,
    }));
  }
}
