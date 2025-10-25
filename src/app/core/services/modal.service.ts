import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  Type
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef?: ComponentRef<any>;
  private closeSubject?: Subject<any>;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  // open modal and return observable for result
  open(component: Type<any>, data?: any): Observable<any> {
    // Create a subject to emit close result
    this.closeSubject = new Subject<any>();

    // Create component
    const factory = this.resolver.resolveComponentFactory(component);
    this.modalRef = factory.create(this.injector);

    // Pass data to modal input (if available)
    if (data) {
      Object.assign(this.modalRef.instance, data);
    }

    // Add a close handler from inside modal
    (this.modalRef.instance as any).close = (result?: any) => {
      this.close(result);
    };

    // Attach to DOM
    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Return observable for result
    return this.closeSubject.asObservable();
  }

  close(result?: any) {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = undefined;
    }
    if (this.closeSubject) {
      this.closeSubject.next(result);
      this.closeSubject.complete();
    }
  }
}
