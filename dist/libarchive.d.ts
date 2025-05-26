declare const libarchive: IArchiveExport;
export interface IArchive {
	newRead(): IArchiveRead;
	newWrite(): IArchiveWrite;
	newEntry(): IArchiveEntry;
	newBuffer(length: number): IArchiveBuffer;
}
export interface IArchiveBuffer {
	release(): void;
	get buffer(): ArrayBuffer;
	get byteOffset(): number;
	get byteLength(): number;
}
export interface IArchiveEntry {
	release(): void;
	get pathname(): string | undefined;
	set pathname(value: string);
	get size(): number | undefined;
	set size(value: number);
	get mode(): number;
	set mode(mode: number);
}
export interface IArchiveExport {
	(params?: string | Buffer): Promise<IArchive>;
	readonly ARCHIVE_OK: number;
	readonly ARCHIVE_RETRY: number;
	readonly ARCHIVE_WARN: number;
	readonly ARCHIVE_FAILED: number;
	readonly ARCHIVE_FATAL: number;
	readonly AE_IFMT: number;
	readonly AE_IFREG: number;
	readonly AE_IFLNK: number;
	readonly AE_IFSOCK: number;
	readonly AE_IFCHR: number;
	readonly AE_IFBLK: number;
	readonly AE_IFDIR: number;
	readonly AE_IFIFO: number;
	decompress(input: string | Buffer, output?: string, options?: DecompressOptions): Promise<void>;
	compress(input: string | string[], output: string, options?: CompressOptions): Promise<void>;
}
export interface IArchiveRead {
	release(): void;
	get errno(): number;
	get errorString(): string;
	supportFilterAll(): void;
	supportFormatAll(): void;
	addPassphrase(passphrase: string): void;
	set onopen(callback: ArchiveOpenCallback);
	set onread(callback: ArchiveReadCallback);
	set onclose(callback: ArchiveCloseCallback);
	open(): void;
	close(): void;
	nextHeader(): IArchiveEntry | undefined;
	dataRead(buffer: IArchiveBuffer, offset?: number, length?: number): number;
	dataSkip(): number;
}
export interface IArchiveWrite {
	release(): void;
	get errno(): number;
	get errorString(): string;
	set format(value: string);
	set options(options: string);
	set passphrase(passphrase: string);
	addFilter(filter: string): void;
	setFormatFilterByExt(filename: string): void;
	set onopen(callback: ArchiveOpenCallback);
	set onwrite(callback: ArchiveWriteCallback);
	set onclose(callback: ArchiveCloseCallback);
	open(): void;
	close(): void;
	writeHeader(entry: IArchiveEntry): number;
	writeData(buffer: IArchiveBuffer, offset?: number, length?: number): number;
}
export type ArchiveCloseCallback = () => number;
export type ArchiveOpenCallback = () => number;
export type ArchiveReadCallback = () => Buffer | undefined;
export type ArchiveWriteCallback = (buffer: IArchiveBuffer) => void;
export type CompressOptions = {
	verbose?: boolean;
	directory?: string;
};
export type DecompressOptions = {
	verbose?: boolean;
};

export {
	libarchive as default,
};

export as namespace libarchive;

export {};
