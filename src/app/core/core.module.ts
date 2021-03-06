import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormPanelComponent} from "./elements/form-panel.component";
import {TooltipDirective} from "./ui/tooltip/tooltip.directive";
import {TooltipContentComponent} from "./ui/tooltip/tooltip-content.component";
import {CodeEditorComponent} from "./ui/code-editor/code-editor.component";
import {IpcService} from "../services/ipc.service";
import {GuidService} from "../services/guid.service";
import {CodePreviewComponent} from "./ui/code-editor/code-preview.component";
import {TreeViewComponent} from "./ui/tree-view/tree-view.component";
import {TreeNodeComponent} from "./ui/tree-view/tree-node.component";
import {TreeNodeIconComponent} from "./ui/tree-view/tree-node-icon.component";
import {MenuItemComponent} from "./ui/menu/menu-item.component";
import {MenuComponent} from "./ui/menu/menu.component";
import {ContextDirective} from "./ui/context/context.directive";
import {ContextService} from "./ui/context/context.service";
import {MdProgressBarModule} from "@angular2-material/progress-bar";
import {MultilangCodeEditorComponent} from "./ui/code-editor/multilang-code-editor.component";
import {ToggleComponent} from "./ui/toggle-slider/toggle-slider.component";
import {StatusBarComponent} from "./status-bar/status-bar.component";
import {MomentModule} from "angular2-moment";

@NgModule({
    entryComponents: [
        TooltipContentComponent,

        // Menu
        MenuItemComponent,
        MenuComponent,

        // Context
        // ContextDirective,

        // Code Editor Components
        MultilangCodeEditorComponent
    ],
    declarations: [
        // Code Editor Components
        CodeEditorComponent,
        CodePreviewComponent,
        MultilangCodeEditorComponent,

        // Form Components
        FormPanelComponent,
        ToggleComponent,

        // Tree Components
        TreeViewComponent,
        TreeNodeComponent,
        TreeNodeIconComponent,

        // Tooltip
        TooltipContentComponent,
        TooltipDirective,

        // Menu
        MenuItemComponent,
        MenuComponent,

        // Context
        ContextDirective,

        StatusBarComponent

    ],
    exports: [
        // Code Editor
        CodeEditorComponent,
        CodePreviewComponent,
        MultilangCodeEditorComponent,

        // Forms
        FormPanelComponent,
        ToggleComponent,

        // Tooltip
        TooltipContentComponent,

        // Tree
        TreeViewComponent,

        // Directives
        TooltipDirective,

        // Menu
        MenuItemComponent,
        MenuComponent,

        // Context
        ContextDirective,

        StatusBarComponent,
    ],
    providers: [
        IpcService,
        GuidService,
        ContextService,

    ],
    imports: [BrowserModule, MdProgressBarModule, MomentModule]
})
export class CoreModule {

}
