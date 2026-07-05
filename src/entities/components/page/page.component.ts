import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  Signal,
  ViewChild,
} from '@angular/core';
import { DocumentPageModel } from '../../../data-access/models/document.model';
import { DocumentService } from '../../../shared/services/document.service';
import { AnnotationService } from '../../../features/annotations/services/annotation.service';
import { AnnotationPopupComponent } from '../../../features/annotations/components/annotation-popup/annotation-popup.component';
import { AnnotationBadgeComponent } from '../../../features/annotations/components/annotation-badge/annotation-badge.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnotationPopupComponent, AnnotationBadgeComponent],
  providers: [AnnotationService],
})
export class PageComponent {
  public annotationService = inject(AnnotationService);
  public documentService = inject(DocumentService);

  public readonly page: InputSignal<DocumentPageModel> = input.required<DocumentPageModel>();

  @ViewChild('container', { read: ElementRef }) containerRef!: ElementRef<HTMLElement>;

  public savedAnnotations: Signal<string[]> = this.annotationService.savedAnnotations;

  constructor() {
    effect(() => {
      this.documentService.updateAnnotationsByPageNumber(
        this.page().number,
        this.savedAnnotations(),
      );
    });
  }

  public addAnnotation(event: MouseEvent): void {
    this.annotationService.openPopup(event.clientX, event.clientY);
  }

  public deleteAnnotation(index: number): void {
    this.annotationService.deleteAnnotation(index);
  }

  public saveAnnotation(annotation: string | null): void {
    if (!annotation) return;

    this.annotationService.saveAnnotation(annotation);
  }
}
