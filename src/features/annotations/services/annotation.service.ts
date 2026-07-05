import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ZoomService } from '../../../shared/services/zoom.service';

@Injectable()
export class AnnotationService {
  private readonly zoomService: ZoomService = inject(ZoomService);

  public isShowPopup: WritableSignal<boolean> = signal(false);

  public cursorX: WritableSignal<number> = signal(0);
  public cursorY: WritableSignal<number> = signal(0);

  public savedAnnotations: WritableSignal<string[]> = signal<string[]>([]);

  saveAnnotation(text: string): void {
    this.savedAnnotations.update((savedAnnotations: string[]) => {
      const annotations = savedAnnotations;
      annotations.push(text);
      return [...annotations];
    });
    this.cancelAdd();
  }

  public deleteAnnotation(index: number): void {
    this.savedAnnotations.update((annotations) =>
      annotations.filter((_, annotationIndex) => annotationIndex !== index),
    );
  }

  cancelAdd(): void {
    this.isShowPopup.set(false);
  }

  open(width: number, height: number) {
    if (this.isShowPopup()) return;

    this.cursorX.set(width / this.zoomService.scale());
    this.cursorY.set(height / this.zoomService.scale());

    this.isShowPopup.set(true);
  }
}
