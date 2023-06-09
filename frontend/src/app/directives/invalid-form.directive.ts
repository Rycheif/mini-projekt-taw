import {Directive, DoCheck, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[invalidForm]'
})
export class InvalidFormDirective implements DoCheck {

  @Input() form?: FormGroup;
  @Input() messageTemplate?: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }


  ngDoCheck(): void {
    this.displayMessageIfFormNotValid()
  }

  private displayMessageIfFormNotValid() {
    this.viewContainerRef.clear();
    if (this.form && this.form.invalid && this.messageTemplate) {
      this.viewContainerRef.createEmbeddedView(this.messageTemplate);
    }
  }

}
