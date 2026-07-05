<!-- Мы можем передавать темплейт для того чтобы менять тип аннотаций.
        Но на данный момент аннотация все равно будет сохранятся в строке.
        Для более комплексного подхода нужно использовать ControlValueAccessor -->

    <!-- <app-annotation-popup>
      <ng-template #content let-annotation="annotation" let-setAnnotation="setAnnotation">
        <input type="text" [ngModel]="annotation" (ngModelChange)="setAnnotation($event)" />
      </ng-template>
    </app-annotation-popup> -->
