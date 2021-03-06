import {Injectable, TemplateRef} from "@angular/core";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import {StatusBarComponent} from "./status-bar.component";
import {noop} from "../../lib/utils.lib";
import {GuidService} from "../../services/guid.service";

@Injectable()
export class StatusBarService {

    public host: StatusBarComponent;

    public status = new ReplaySubject<{ message: string, time?: Date }>();

    public queueSize = new BehaviorSubject(0);

    public process: Observable<string>;

    public readonly controls = new ReplaySubject<TemplateRef>();

    private processMap = {};

    constructor(private guid: GuidService) {

    }

    public enqueue(process: Observable<string>, completionMessage = "") {

        this.queueSize.next(this.queueSize.getValue() + 1);

        this.process = (this.process || Observable).concat(process);

        process.last().subscribe(() => {

            this.queueSize.next(this.queueSize.getValue() - 1);

            if (completionMessage) {
                this.setStatus(completionMessage);
            }
        });
    }

    public startProcess(firstMessage = "", completionMessage = "") {
        const id = this.guid.generate();

        const p = new BehaviorSubject(firstMessage);

        this.processMap[id] = p;
        this.enqueue(p, completionMessage);

        p.subscribe(noop, noop, () => delete this.processMap[name]);

        return id;
    }

    public getProcess(id: string): Subject<string> {
        return this.processMap[id];
    }

    public stopProcess(id, status?: string) {
        const p = this.getProcess(id);

        if (!p) {
            console.error(`Process “${id}” doesn't exist.`);
            return;
        }

        if (status) {
            this.setStatus(status);
        }

        p.complete();
    }

    public setStatus(message, time = true) {
        this.status.next({message, time: time ? new Date() : undefined});
    }

    public setControls(tpl: TemplateRef) {
        this.controls.next(tpl);
    }

    public removeControls() {
        this.controls.next(undefined);
    }

}
