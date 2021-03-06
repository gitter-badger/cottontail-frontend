import {Subject} from "rxjs";
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    Output,
    ViewChildren,
    TemplateRef,
    QueryList
} from "@angular/core";
import {ComponentBase} from "../../../components/common/component-base";
import {CommandInputParameterModel} from "cwlts/models/d2sb";
import {EditorInspectorService} from "../../../editor-common/inspector/editor-inspector.service";


require("./input-list.component.scss");

@Component({
    selector: "ct-tool-input-list",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `                        
                    <!--List Header Row-->
                    <div class="gui-section-list-title row">
                        <div class="col-sm-4">ID</div>
                        <div class="col-sm-3">Type</div>
                        <div class="col-sm-4">Binding</div>
                    </div>
                
                    <!--Input List Entries-->
                    <ul class="gui-section-list">
                    
                        <!--List Entry-->
                        <li *ngFor="let entry of entries; let i = index" 
                            class="input-list-items container" 
                            [class.record-input]="entry.type.type === 'record'">                          

                            <div class="gui-section-list-item clickable row"
                                [ct-editor-inspector]="inspector"
                                [ct-editor-inspector-target]="entry"
                                [ct-validation-class]="entry.validation">
                                
                                <!--ID Column-->
                                <div class="col-sm-4 ellipsis">
                                    <ct-validation-preview [entry]="entry.validation"></ct-validation-preview>
                                    {{ entry.id }}
                                </div>
                                
                                <!--Type Column-->
                                <div class="col-sm-3 ellipsis">
                                    {{ entry.type | commandParameterType }}
                                </div>
                                
                                <!--Binding Column-->
                                <div class="col-sm-4 ellipsis" [class.col-sm-5]="readonly">
                                    {{ entry.inputBinding | commandInputBinding }}
                                </div>
                                
                                <!--Actions Column-->
                                <div *ngIf="!readonly" class="col-sm-1 align-right">
                                    <i [ct-tooltip]="'Delete'"
                                       class="fa fa-trash text-hover-danger" 
                                       (click)="removeEntry(i)"></i>
                                </div>
                            </div>

                            <!--Object Inspector Template -->
                            <template #inspector>
                                <ct-editor-inspector-content>
                                    <div class="tc-header">{{ entry.loc || "Input" }}</div>
                                    <div class="tc-body">
                                        <ct-tool-input-inspector 
                                            (save)="updateInput($event, i)" 
                                            [context]="context"
                                            [input]="entry">
                                        </ct-tool-input-inspector>
                                    </div>
                                </ct-editor-inspector-content>
                            </template>
                            
                            
                        <div *ngIf="entry.type.fields" class="">
                            <ct-tool-input-list *ngIf = "entry.type.type === 'record'" [entries]="entry.type.fields"
                                  [location]="getFieldsLocation(i)"
                                  [isField]="true"
                                  (update)="updateFields($event, i)">                             
                            </ct-tool-input-list>    
                        </div>                           
                                                  
                        </li>
                    </ul>
            
                <!--Add Input Button-->
                <button *ngIf="!readonly" 
                        (click)="addEntry()" 
                        type="button" 
                        class="btn pl-0 btn-link no-outline no-underline-hover">
                    <i class="fa fa-plus"></i> Add an Input
                </button>

    `
})
export class ToolInputListComponent extends ComponentBase {

    @Input()
    public entries: CommandInputParameterModel[] = [];

    /** Model location entry, used for tracing the path in the json document */
    @Input()
    public location = "";

    /** Context in which expression should be evaluated */
    @Input()
    public context: {$job: any};

    @Input()
    public readonly = false;

    /** Flag if input is field of a record */
    @Input()
    public isField = false;

    @Output()
    public readonly update = new Subject();

    @ViewChildren("inspector", {read: TemplateRef})
    private inspectorTemplate: QueryList<TemplateRef<any>>;

    constructor(private inspector: EditorInspectorService) {
        super();
    }

    private removeEntry(index) {

        if (this.inspector.isInspecting(this.entries[index])) {
            this.inspector.hide();
        }

        const entries = this.entries.slice(0, index).concat(this.entries.slice(index + 1));
        this.update.next(entries);
    }

    private addEntry() {
        const newEntryLocation = `${this.location}[${this.entries.length}]`;
        const newEntry = new CommandInputParameterModel(newEntryLocation);
        newEntry.isField = this.isField;
        newEntry.type.type = "File";
        const entries = this.entries.concat(newEntry);
        this.update.next(entries);

        this.inspectorTemplate.changes
            .take(1)
            .delay(1)
            .map(list => list.last)
            .subscribe(templateRef => {
                this.inspector.show(templateRef, newEntry);
            });
    }

    private getFieldsLocation(index: number) {
        return `${this.location}[${index}].type.fields`;
    }

    private updateFields(newFields, i) {
        const type = this.entries[i].type;
        type.fields = [];
        newFields.forEach(field => {
            field.isField = true;
            type.addField(field)
        });

        this.update.next(this.entries.slice());
    }

    private updateInput(newInput: CommandInputParameterModel, index: number) {

        // FIXME: cloning an object ditches its prototype chain, but we need it
        const input = this.entries[index];

        /**
         * FIXME: input parameter type needs to be able to switch references
         * then make {@link CommandParameterTypePipe} pure again.
         */
        Object.assign(input, newInput);

        this.update.next(this.entries.slice());
    }
}
