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

  open(component: Type<any>, data?: any): Observable<any> {
    this.closeSubject = new Subject<any>();

    const factory = this.resolver.resolveComponentFactory(component);
    this.modalRef = factory.create(this.injector);

    if (data) {
      Object.assign(this.modalRef.instance, data);
    }

    (this.modalRef.instance as any).close = (result?: any) => {
      this.close(result);
    };

    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

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
