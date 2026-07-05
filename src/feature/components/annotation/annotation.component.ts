import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostListener,
  inject,
  Input,
  input,
  InputSignal,
  output,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnnotationService } from '../../services/annotation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annotation',
  imports: [FormsModule, CommonModule],
  templateUrl: `./annotation.component.html`,
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AnnotationComponent {
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
