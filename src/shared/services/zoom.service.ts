import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private _zoomLevel: WritableSignal<number> = signal(100);

  public readonly zoomLevel: Signal<number> = this._zoomLevel.asReadonly();
  public readonly scale: Signal<number> = computed(() => this.zoomLevel() / 100);

  private readonly differenceZoomValue: number = 10;
  private readonly maxZoomValue: number = 200;
  private readonly minZoomValue: number = 50;

  public zoomIn(): void {
    this._zoomLevel.update((value: number) =>
      Math.min(value + this.differenceZoomValue, this.maxZoomValue),
    );
  }

  public zoomOut(): void {
    this._zoomLevel.update((value: number) =>
      Math.max(value - this.differenceZoomValue, this.minZoomValue),
    );
  }
}
