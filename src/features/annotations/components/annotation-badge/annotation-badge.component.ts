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
  templateUrl: './annotation-badge.component.html',
  styleUrl: './annotation-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationBadgeComponent {
  private readonly zoomService: ZoomService = inject(ZoomService);

  public readonly annotation: InputSignal<string | null> = input.required<string | null>();
  public readonly containerRef: InputSignal<ElementRef<HTMLElement>> =
    input.required<ElementRef<HTMLElement>>();

  @ViewChild('drag', { read: ElementRef }) dragRef!: ElementRef<HTMLElement>;

  public readonly delete = output<void>();

  public badgeWidth = signal(50);
  public badgeHeight = signal(50);

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

    let tempWidth = event.clientX - this.offsetX - containerRect.left;
    let tempHeight = event.clientY - this.offsetY - containerRect.top;

    let resultBadgeWidth = tempWidth / this.zoomService.scale();
    let resultBadgeHeight = tempHeight / this.zoomService.scale();

    const maxXBox = (containerRect.width - dragContainer.width) / this.zoomService.scale();
    const maxYBox = (containerRect.height - dragContainer.height) / this.zoomService.scale();

    this.badgeWidth.set(Math.max(0, Math.min(resultBadgeWidth, maxXBox)));
    this.badgeHeight.set(Math.max(0, Math.min(resultBadgeHeight, maxYBox)));
  }

  @HostListener('document:mouseup')
  onUp(): void {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.dragRef.nativeElement.style.cursor = 'grab';
  }

  public deleteAnnotation(): void {
    this.delete.emit();
  }
}
