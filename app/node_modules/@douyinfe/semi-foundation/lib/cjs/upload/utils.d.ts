export declare const byteKB = 1024;
export declare const byteMB = 1048576;
export declare function getFileSize(number: number): string;
export declare function endsWith(str: string, suffix: string): boolean;
export declare function loopFiles(item: FileSystemDirectoryEntry): Promise<Array<FileSystemEntry>>;
export declare function mapFileTree(items: Array<DataTransferItem>): Promise<Array<File>>;
