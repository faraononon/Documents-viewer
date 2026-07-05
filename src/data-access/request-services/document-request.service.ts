import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { DocumentDto } from '../dtos/document.dto';
import { DocumentMapperService } from '../mappers/document-mapper.service';
import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentRequestService {
  private http = inject(HttpClient);
  private documentMapperService = inject(DocumentMapperService);

  public getDocument(): Observable<DocumentModel> {
    return this.http.get<DocumentDto>('assets/1.json').pipe(
      delay(500),
      map((jsonData: DocumentDto) => this.documentMapperService.mapToModel(jsonData)),
    );
  }
}
