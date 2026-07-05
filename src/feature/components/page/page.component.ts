import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { DocumentPageModel } from '../../../data-access/models/document.model';
import { AnnotationComponent } from '../annotation/annotation.component';
import { AnnotationService } from '../../services/annotation.service';
import { FormsModule } from '@angular/forms';
import { AnnotationBadgeComponent } from '../annotation-badge/annotation-badge.component';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnotationComponent, AnnotationBadgeComponent, FormsModule],
  providers: [AnnotationService],
})
export class PageComponent {
  public readonly page: InputSignal<DocumentPageModel> = input.required<DocumentPageModel>();

  @ViewChild('container', { read: ElementRef }) containerRef!: ElementRef<HTMLElement>;

  public annotationService: AnnotationService = inject(AnnotationService);
  public documentService: DocumentService = inject(DocumentService);
  public savedAnnotations: WritableSignal<string[]> = this.annotationService.savedAnnotations;

  constructor() {
    effect(() => {
      this.documentService.updateAnnotationsByPageNumber(
        this.page().number,
        this.savedAnnotations(),
      );
    });
  }

  public addAnnotation(event: MouseEvent): void {
    this.annotationService.open(event.clientX, event.clientY);
  }

  public deleteAnnotation(index: number): void {
    this.annotationService.deleteAnnotation(index);
  }

  public saveAnnotation(annotation: string | null): void {
    if (!annotation) return;

    this.annotationService.saveAnnotation(annotation);
  }
}
