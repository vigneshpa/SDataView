export default class SDataView {
    #inner: DataView;
    constructor(buffer: ArrayBufferLike, byteOffset?: number, byteLength?: number) {
        if (typeof byteOffset === "undefined")
            byteOffset = 0;
        if (typeof byteLength === "undefined")
            byteLength = buffer.byteLength;
        this.#inner = new DataView(buffer, byteOffset, byteLength);
    }
    get [Symbol.toStringTag](): string {
        return "SDataView";
    }
    get buffer(): ArrayBufferLike {
        return this.#inner.buffer;
    }
    get byteLength(): number {
        return this.#inner.byteLength;
    }
    get byteOffset(): number {
        return this.#inner.byteOffset;
    }
    getFloat32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getFloat32(byteOffset, littleEndian);
    }
    getFloat64(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getFloat64(byteOffset, littleEndian);
    }
    getInt8(byteOffset: number): number {
        return this.#inner.getInt8(byteOffset);
    }
    getInt16(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getInt16(byteOffset, littleEndian);
    }
    getInt32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getInt32(byteOffset, littleEndian);
    }
    getUint8(byteOffset: number): number {
        return this.#inner.getUint8(byteOffset);
    }
    getUint16(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getUint16(byteOffset, littleEndian);
    }
    getUint32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getUint32(byteOffset, littleEndian);
    }
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setFloat32(byteOffset, value, littleEndian);
    }
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setFloat64(byteOffset, value, littleEndian);
    }
    setInt8(byteOffset: number, value: number): void {
        this.#inner.setInt8(byteOffset, value);
    }
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setInt16(byteOffset, value, littleEndian);
    }
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setInt32(byteOffset, value, littleEndian);
    }
    setUint8(byteOffset: number, value: number): void {
        this.#inner.setUint8(byteOffset, value);
    }
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setUint16(byteOffset, value, littleEndian);
    }
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setUint32(byteOffset, value, littleEndian);
    }
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.#inner.getBigInt64(byteOffset, littleEndian);
    }
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.#inner.getBigUint64(byteOffset, littleEndian);
    }
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.#inner.setBigInt64(byteOffset, value, littleEndian);
    }
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.#inner.setBigUint64(byteOffset, value, littleEndian);
    }

    // Extended operations
    #ioOffset: number = 0;
    get readOffset(): number {
        return this.#ioOffset;
    }
    get writeOffset(): number {
        return this.#ioOffset;
    }
    isLittleEndian: boolean = true;
    reset() {
        this.#ioOffset = 0;
    }
    subview(byteOffset: number, byteLength: number = (this.byteLength - byteOffset)): SDataView {
        return new SDataView(this.buffer, this.byteOffset + byteOffset, byteLength);
    }
    readFloat32(): number {
        const data = this.getFloat32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    readFloat64(): number {
        const data = this.getFloat64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    readInt8(): number {
        const data = this.getInt8(this.#ioOffset);
        this.#ioOffset += 8 / 8;
        return data;
    }
    readInt16(): number {
        const data = this.getInt16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
        return data;
    }
    readInt32(): number {
        const data = this.getInt32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    readUint8(): number {
        const data = this.getUint8(this.#ioOffset);
        this.#ioOffset += 8 / 8;
        return data;
    }
    readUint16(): number {
        const data = this.getUint16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
        return data;
    }
    readUint32(): number {
        const data = this.getUint32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    writeFloat32(value: number): void {
        this.setFloat32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    writeFloat64(value: number): void {
        this.setFloat64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }
    writeInt8(value: number): void {
        this.setInt8(this.#ioOffset, value);
        this.#ioOffset += 8 / 8;
    }
    writeInt16(value: number): void {
        this.setInt16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
    }
    writeInt32(value: number): void {
        this.setInt32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    writeUint8(value: number): void {
        this.setUint8(this.#ioOffset, value);
        this.#ioOffset += 8 / 8;
    }
    writeUint16(value: number): void {
        this.setUint16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
    }
    writeUint32(value: number): void {
        this.setUint32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    readBigInt64(): bigint {
        const data = this.getBigInt64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    readBigUint64(): bigint {
        const data = this.getBigUint64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    writeBigInt64(value: bigint): void {
        this.setBigInt64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }
    writeBigUint64(value: bigint): void {
        this.setBigUint64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }
}
