import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { ZoomService } from '../../../../shared/services/zoom.service';

@Component({
  selector: 'app-annotation-badge',
  imports: [],
  templateUrl: './annotation-badge.component.html',
  styleUrl: './annotation-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationBadgeComponent {
  private readonly zoomService: ZoomService = inject(ZoomService);

  public readonly annotation: InputSignal<string | null> = input.required<string | null>();
  public readonly containerRef: InputSignal<ElementRef<HTMLElement>> =
    input.required<ElementRef<HTMLElement>>();

  @ViewChild('dragMe', { read: ElementRef }) dragRef!: ElementRef<HTMLElement>;

  public readonly delete = output<void>();

  x = signal(50);
  y = signal(50);

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  startDrag(event: MouseEvent): void {
    this.isDragging = true;

    const dragContainer = this.dragRef.nativeElement.getBoundingClientRect();

    this.offsetX = event.clientX - dragContainer.left;
    this.offsetY = event.clientY - dragContainer.top;

    this.dragRef.nativeElement.style.cursor = 'grabbing';
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const containerRect = this.containerRef().nativeElement.getBoundingClientRect();
    const dragContainer = this.dragRef.nativeElement.getBoundingClientRect();

    let tempX = event.clientX - this.offsetX - containerRect.left;
    let tempY = event.clientY - this.offsetY - containerRect.top;

    let x = tempX / this.zoomService.scale();
    let y = tempY / this.zoomService.scale();

    const maxX = (containerRect.width - dragContainer.width) / this.zoomService.scale();
    const maxY = (containerRect.height - dragContainer.height) / this.zoomService.scale();

    this.x.set(Math.max(0, Math.min(x, maxX)));
    this.y.set(Math.max(0, Math.min(y, maxY)));
  }

  @HostListener('document:mouseup')
  onUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.dragRef.nativeElement.style.cursor = 'grab';
    }
  }

  public deleteAnnotation(): void {
    this.delete.emit();
  }
}
