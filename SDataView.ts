export default class SDataView extends DataView {
    #ioOffset: number = 0;
    get readOffset() {
        return this.#ioOffset;
    }
    get writeOffset(){
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
        this.#ioOffset += 32/8;
        return data;
    }
    readFloat64(): number {
        const data = this.getFloat64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64/8;
        return data;
    }
    readInt8(): number {
        const data = this.getInt8(this.#ioOffset);
        this.#ioOffset += 8/8;
        return data;
    }
    readInt16(): number {
        const data = this.getInt16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16/8;
        return data;
    }
    readInt32(): number {
        const data = this.getInt32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32/8;
        return data;
    }
    readUint8(): number {
        const data = this.getUint8(this.#ioOffset);
        this.#ioOffset += 8/8;
        return data;
    }
    readUint16(): number {
        const data = this.getUint16(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 16/8;
        return data;
    }
    readUint32(): number {
        const data = this.getUint32(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 32/8;
        return data;
    }
    writeFloat32(value: number): void {
        this.setFloat32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32/8;
    }
    writeFloat64(value: number): void {
        this.setFloat64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64/8;
    }
    writeInt8(value: number): void {
        this.setInt8(this.#ioOffset, value);
        this.#ioOffset += 8/8;
    }
    writeInt16(value: number): void {
        this.setInt16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16/8;
    }
    writeInt32(value: number): void {
        this.setInt32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32/8;
    }
    writeUint8(value: number): void {
        this.setUint8(this.#ioOffset, value);
        this.#ioOffset += 8/8;
    }
    writeUint16(value: number): void {
        this.setUint16(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 16/8;
    }
    writeUint32(value: number): void {
        this.setUint32(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 32/8;
    }
    readBigInt64(): bigint {
        const data = this.getBigInt64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64/8;
        return data;
    }
    readBigUint64(): bigint {
        const data = this.getBigUint64(this.#ioOffset, this.isLittleEndian);
        this.#ioOffset += 64/8;
        return data;
    }
    writeBigInt64(value: bigint): void {
        this.setBigInt64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64/8;
    }
    writeBigUint64(value: bigint): void {
        this.setBigUint64(this.#ioOffset, value, this.isLittleEndian);
        this.#ioOffset += 64/8;
    }
}
