import {Observable} from "rxjs";
import {MenuItem} from "../../core/ui/menu/menu-item";

export abstract class UserProjectsService {
    public abstract getContextMenu(name: string, content: Observable<string>): MenuItem[];
}
