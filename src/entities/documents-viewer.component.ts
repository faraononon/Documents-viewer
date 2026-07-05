import { Component, inject, Signal } from '@angular/core';
import { DocumentRequestService } from '../data-access/request-services/document-request.service';
import { DocumentModel } from '../data-access/models/document.model';
import { ZoomService } from '../shared/services/zoom.service';
import { DocumentService } from '../shared/services/document.service';
import { PageComponent } from './components/page/page.component';

@Component({
  selector: 'app-documents-viewer',
  templateUrl: './documents-viewer.component.html',
  styleUrl: './documents-viewer.component.scss',
  providers: [DocumentRequestService],
  imports: [PageComponent],
})
export class DocumentsViewer {
  public readonly documentRequestService: DocumentRequestService = inject(DocumentRequestService);
  public readonly zoomService: ZoomService = inject(ZoomService);
  public readonly documentService: DocumentService = inject(DocumentService);

  public document: Signal<DocumentModel | null> = this.documentService.document;
  public zoomLevel: Signal<number> = this.zoomService.zoomLevel;
  public scale: Signal<number> = this.zoomService.scale;

  public zoomIn(): void {
    this.zoomService.zoomIn();
  }

  public zoomOut(): void {
    this.zoomService.zoomOut();
  }

  public save(): void {
    this.documentService.save();
  }
}
