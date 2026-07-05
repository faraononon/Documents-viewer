import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  output,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-annotation',
  imports: [FormsModule, CommonModule],
  templateUrl: `./annotation-popup.component.html`,
  styleUrl: './annotation-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AnnotationPopupComponent {
  public annotationService: AnnotationService = inject(AnnotationService);

  public isShowPopup: WritableSignal<boolean> = this.annotationService.isShowPopup;
  public cursorX: WritableSignal<number> = this.annotationService.cursorX;
  public cursorY: WritableSignal<number> = this.annotationService.cursorY;

  public annotation: WritableSignal<string> = signal('');

  public hasContent: WritableSignal<boolean> = signal(false);

  public readonly save = output<string>();

  @ContentChild('content') anotherTypeOfContent: TemplateRef<unknown> | null = null;

  public ngAfterContentInit(): void {
    this.hasContent.set(!!this.anotherTypeOfContent);
  }

  public cancelAdd(): void {
    this.annotation.set('');
    this.annotationService.cancelAdd();
  }

  public setAnnotation(value: string): void {
    this.annotation.set(value);
  }

  public saveAnnotation(): void {
    this.save.emit(this.annotation());

    this.cancelAdd();
  }
}
