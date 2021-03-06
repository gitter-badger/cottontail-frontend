import {Injectable, ViewContainerRef, ComponentRef, ComponentFactoryResolver} from "@angular/core";
import {Observable} from "rxjs";
import {MenuComponent} from "../menu/menu.component";
import {MenuItem} from "../menu/menu-item";

@Injectable()
export class ContextService {

    private embeddedComponent: ComponentRef<MenuComponent>;

    constructor(private resolver: ComponentFactoryResolver) {

    }

    public showAt(container: ViewContainerRef, menuItems: MenuItem[], coordinates: {x: number, y: number}) {
        this.close();
        const factory          = this.resolver.resolveComponentFactory(MenuComponent);
        this.embeddedComponent = container.createComponent<MenuComponent>(factory);
        this.embeddedComponent.instance.setItems(menuItems);

        const nEl = this.embeddedComponent.location.nativeElement as HTMLElement;

        const {x, y}       = coordinates;
        nEl.style.position = "fixed";
        nEl.style.left     = x + "px";
        nEl.style.top      = y + "px";

        Observable.fromEvent(document, "click").first().subscribe(_ => {
            this.close();
        });
    }


    public close() {
        if (this.embeddedComponent) {
            this.embeddedComponent.destroy();
        }
    }
}

