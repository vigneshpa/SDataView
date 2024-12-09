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
    // Get the internal buffer inside the view
    get buffer(): ArrayBufferLike {
        return this.#inner.buffer;
    }
    // Get the byteLength of this SDataView
    get byteLength(): number {
        return this.#inner.byteLength;
    }
    // Get the offset from which this SDataView starts
    // Note: This value will not change during read/write operations
    get byteOffset(): number {
        return this.#inner.byteOffset;
    }
    // Get the 32-bit floating point number at this location
    getFloat32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getFloat32(byteOffset, littleEndian);
    }
    // Get the 64-bit floating point number at this location
    getFloat64(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getFloat64(byteOffset, littleEndian);
    }
    // Get the 8-bit integer present at this location
    getInt8(byteOffset: number): number {
        return this.#inner.getInt8(byteOffset);
    }
    // Get the 16-bit integer present at this location
    getInt16(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getInt16(byteOffset, littleEndian);
    }
    // Get the 32-bit integer present at this location
    getInt32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getInt32(byteOffset, littleEndian);
    }
    // Get the 8-bit unsinged integer present at this location
    getUint8(byteOffset: number): number {
        return this.#inner.getUint8(byteOffset);
    }
    // Get the 16-bit unsinged integer present at this location
    getUint16(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getUint16(byteOffset, littleEndian);
    }
    // Get the 32-bit unsinged integer present at this location
    getUint32(byteOffset: number, littleEndian?: boolean): number {
        return this.#inner.getUint32(byteOffset, littleEndian);
    }
    // Set the 32-bit floating point integer present at this location
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setFloat32(byteOffset, value, littleEndian);
    }
    // Set the 64-bit floating point integer present at this location
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setFloat64(byteOffset, value, littleEndian);
    }
    // Set the 8-bit integer present at this location
    setInt8(byteOffset: number, value: number): void {
        this.#inner.setInt8(byteOffset, value);
    }
    // Set the 16-bit integer present at this location
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setInt16(byteOffset, value, littleEndian);
    }
    // Set the 32-bit integer present at this location
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setInt32(byteOffset, value, littleEndian);
    }
    // Set the 8-bit unsinged integer present at this location
    setUint8(byteOffset: number, value: number): void {
        this.#inner.setUint8(byteOffset, value);
    }
    // Set the 16-bit unsinged integer present at this location
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setUint16(byteOffset, value, littleEndian);
    }
    // Set the 32-bit unsinged integer present at this location
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.#inner.setUint32(byteOffset, value, littleEndian);
    }
    // Get the 64-bit integer present at this location
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.#inner.getBigInt64(byteOffset, littleEndian);
    }
    // Get the 64-bit unsigned integer present at this location
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.#inner.getBigUint64(byteOffset, littleEndian);
    }
    // Set the 64-bit integer present at this location
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.#inner.setBigInt64(byteOffset, value, littleEndian);
    }
    // Set the 64-bit unsinged integer present at this location
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.#inner.setBigUint64(byteOffset, value, littleEndian);
    }

    // Extended operations
    #ioOffset: number = 0;

    // Extended: This will return the internal I/O Offset
    get ioOffset(): number {
        return this.#ioOffset;
    }
    // Determines whether the values larget than 8-bit must be read in little-endian byte-order
    // Default: true
    isLittleEndian: boolean = true;
    // Resets the internal I/O Offset
    reset() {
        this.#ioOffset = 0;
    }
    // Creates a new sub-SDataView with the same underlying Buffer
    subview(byteOffset: number, byteLength: number = (this.byteLength - byteOffset)): SDataView {
        return new SDataView(this.buffer, this.byteOffset + byteOffset, byteLength);
    }
    // I/O: Read a 32-bit floating point number and move the internal I/O Offset
    readFloat32(): number | null {
        if (!this.#withinIoBounds(32 / 8))
            return null;
        const data = this.getFloat32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    // I/O: Read a 64-bit floating point and move the internal I/O Offset
    readFloat64(): number | null {
        if (!this.#withinIoBounds(64 / 8))
            return null;
        const data = this.getFloat64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    // I/O: Read a 8-bit integer and move the internal I/O Offset
    readInt8(): number | null {
        if (!this.#withinIoBounds(8 / 8))
            return null;
        const data = this.getInt8(this.#ioOffset);
        this.#ioOffset += 8 / 8;
        return data;
    }
    // I/O: Read a 16-bit integer and move the internal I/O Offset
    readInt16(): number | null {
        if (!this.#withinIoBounds(16 / 8))
            return null;
        const data = this.getInt16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
        return data;
    }
    // I/O: Read a 32-bit integer and move the internal I/O Offset
    readInt32(): number | null {
        if (!this.#withinIoBounds(32 / 8))
            return null;
        const data = this.getInt32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    // I/O: Read a 8-bit unsigned integer and move the internal I/O Offset
    readUint8(): number | null {
        if (!this.#withinIoBounds(8 / 8))
            return null;
        const data = this.getUint8(this.#ioOffset);
        this.#ioOffset += 8 / 8;
        return data;
    }
    // I/O: Read a 16-bit unsigned integer and move the internal I/O Offset
    readUint16(): number | null {
        if (!this.#withinIoBounds(16 / 8))
            return null;
        const data = this.getUint16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
        return data;
    }
    // I/O: Read a 32-bit unsigned integer and move the internal I/O Offset
    readUint32(): number | null {
        if (!this.#withinIoBounds(32 / 8))
            return null;
        const data = this.getUint32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
        return data;
    }
    // I/O: Write a 32-bit floating point number and move the internal I/O Offset
    writeFloat32(value: number): void {
        if (!this.#withinIoBounds(32 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setFloat32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    // I/O: Write a 64-bit floating point and move the internal I/O Offset
    writeFloat64(value: number): void {
        if (!this.#withinIoBounds(64 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setFloat64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }
    // I/O: Write a 8-bit integer and move the internal I/O Offset
    writeInt8(value: number): void {
        if (!this.#withinIoBounds(8 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setInt8(this.#ioOffset, value);
        this.#ioOffset += 8 / 8;
    }
    // I/O: Write a 16-bit integer and move the internal I/O Offset
    writeInt16(value: number): void {
        if (!this.#withinIoBounds(16 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setInt16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
    }
    // I/O: Write a 32-bit integer and move the internal I/O Offset
    writeInt32(value: number): void {
        if (!this.#withinIoBounds(32 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setInt32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    // I/O: Write a 8-bit unsigned integer and move the internal I/O Offset
    writeUint8(value: number): void {
        if (!this.#withinIoBounds(8 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setUint8(this.#ioOffset, value);
        this.#ioOffset += 8 / 8;
    }
    // I/O: Write a 16-bit unsigned integer and move the internal I/O Offset
    writeUint16(value: number): void {
        if (!this.#withinIoBounds(16 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setUint16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16 / 8;
    }
    // I/O: Write a 32-bit unsigned integer and move the internal I/O Offset
    writeUint32(value: number): void {
        if (!this.#withinIoBounds(32 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setUint32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32 / 8;
    }
    // I/O: Read a 64-bit integer and move the internal I/O Offset
    readBigInt64(): bigint | null {
        if (!this.#withinIoBounds(64 / 8))
            return null;
        const data = this.getBigInt64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    // I/O: Read a 64-bit unsigned integer and move the internal I/O Offset
    readBigUint64(): bigint | null {
        if (!this.#withinIoBounds(64 / 8))
            return null;
        const data = this.getBigUint64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
        return data;
    }
    // I/O: Write a 64-bit integer and move the internal I/O Offset
    writeBigInt64(value: bigint): void {
        if (!this.#withinIoBounds(64 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setBigInt64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }
    // I/O: Write a 64-bit unsigned integer and move the internal I/O Offset
    writeBigUint64(value: bigint): void {
        if (!this.#withinIoBounds(64 / 8))
            throw new Error("SDataView: Cannot write outside of the view");
        this.setBigUint64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64 / 8;
    }

    #withinIoBounds(elementSize: number): boolean {
        return !(this.#ioOffset + elementSize > this.byteLength);
    }
}
