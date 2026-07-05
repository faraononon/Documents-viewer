import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { DocumentModel, DocumentPageModel } from '../../data-access/models/document.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocumentRequestService } from '../../data-access/request-services/document-request.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public readonly documentRequestService: DocumentRequestService = inject(DocumentRequestService);

  public document: Signal<DocumentModel | null> = toSignal(
    this.documentRequestService.getDocument(),
    {
      initialValue: null,
    },
  );

  public annotations: WritableSignal<Map<number, string[]>> = signal(new Map());

  public updateAnnotationsByPageNumber(pageNumber: number, annotations: string[]) {
    this.annotations.update((annotationsMap: Map<number, string[]>) => {
      return annotationsMap.set(pageNumber, [...annotations]);
    });
  }

  public save(): void {
    const document = this.document();

    if (!document) return;

    const result: DocumentModel = {
      ...document,
      pages: document.pages.map((page: DocumentPageModel) => ({
        ...page,
        annotations: this.annotations().get(page.number) || [],
      })),
    };

    console.log(result);
  }
}
