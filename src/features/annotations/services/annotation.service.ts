import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ZoomService } from '../../../shared/services/zoom.service';

@Injectable()
export class AnnotationService {
  private readonly zoomService: ZoomService = inject(ZoomService);

  public isShowPopup: WritableSignal<boolean> = signal(false);
  public cursorX: WritableSignal<number> = signal(0);
  public cursorY: WritableSignal<number> = signal(0);

  private _savedAnnotations: WritableSignal<string[]> = signal<string[]>([]);
  public readonly savedAnnotations: Signal<string[]> = this._savedAnnotations.asReadonly();

  saveAnnotation(text: string): void {
    this._savedAnnotations.update((savedAnnotations: string[]) => {
      const annotations = savedAnnotations;
      annotations.push(text);
      return [...annotations];
    });

    this.cancelAdd();
  }

  public deleteAnnotation(index: number): void {
    this._savedAnnotations.update((annotations: string[]) =>
      annotations.filter((_, annotationIndex: number) => annotationIndex !== index),
    );
  }

  cancelAdd(): void {
    this.isShowPopup.set(false);
  }

  openPopup(width: number, height: number): void {
    if (this.isShowPopup()) return;

    this.cursorX.set(width / this.zoomService.scale());
    this.cursorY.set(height / this.zoomService.scale());

    this.isShowPopup.set(true);
  }
}
