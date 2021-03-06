import {EventHubService} from "./event-hub/event-hub.service";
import {FileModel} from "../store/models/fs.models";
import {HashCache} from "../lib/cache.lib";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FileRegistry {

    // Contains all loaded files
    private fileCache: HashCache<FileModel>;

    constructor(private eventHub: EventHubService) {

        this.fileCache = new HashCache<FileModel>({}, (a, b) => a.isChangedSince(b));

        // this.eventHub.onValueFrom(OpenFileRequestAction)
        //     .subscribe(file => this.fileCache.put(file.id, file));
        //
        // this.eventHub.onValueFrom(UpdateFileAction)
        //     .subscribe(file => this.fileCache.put(file.id, file));

        // this.eventHub.on(CreateFileRequestAction)
        //     .flatMap(action => {
        //         return this.files.createFile(action.payload)
        //             .let(this.eventHub.intercept<FileModel>(action))
        //     })
        //     .subscribe(file => {
        //         this.fileCache.put(file.id, file);
        //         this.eventHub.publish(new FileCreatedAction(file));
        //     });
        //
        // this.eventHub.onValueFrom(SaveFileRequestAction)
        //     .flatMap(file => this.files.updateFile(file.relativePath, file.tabData).map(_ => file))
        //     .subscribe(file => {
        //         this.fileCache.put(file.id, Object.assign(file, {
        //             originalContent: file.tabData,
        //             isModified: false
        //         }));
        //     });
        //
        // this.eventHub.on(CopyFileRequestAction)
        //     .flatMap(action => {
        //         const {source, destination} = action.payload;
        //         return this.files.copyFile(source, destination)
        //             .let(this.eventHub.intercept<FileModel>(action))
        //     })
        //     .subscribe((file: FileModel) => {
        //         this.eventHub.publish(new FileCreatedAction(file));
        //     });
        //
        // this.eventHub.on(DeleteFileRequestAction)
        //     .flatMap(action => {
        //         const file = action.payload;
        //         return this.files.deleteFile(file.absolutePath).map(_ => file);
        //     })
        //     .subscribe((file: FileModel) => {
        //         this.eventHub.publish(new FileDeletedAction(file));
        //     });
        //
        // this.eventHub.on(DeleteFolderRequestAction)
        //     .flatMap(action => {
        //         const path = action.payload;
        //         return this.files.deleteFile(path).map(_ => path);
        //     })
        //     .subscribe(path => {
        //         this.eventHub.publish(new FolderDeletedAction(path));
        //     });
        //
        // this.eventHub.onValueFrom(FileDeletedAction).subscribe((file: FileModel) => {
        //     this.fileCache.remove(file.id);
        // });
    }

    /**
     * Get the fully loaded FileModel.
     */
    public getFile(file: FileModel): Observable<FileModel> {


        // Deprecated functionality
        // if (!this.fileCache.has(file.id)) {
        //     this.eventHub.publish(new FetchFileRequestAction(file));
        // }
        return this.fileCache.watch(file.id);
    }

    public watchFile(file: FileModel): Observable<FileModel> {
        return this.fileCache.watch(file.id);
    }

    public add(file: FileModel) {
        this.fileCache.put(file.id, file);
    }

}
