# SDataView
A Simple DataView library, to simplify for IO operations on a ArrayBuffer.
This is a dropin replacement for the DataVeiw interface.

## Example

```js
import SDataView form "sdataview"

const array = new Uint8Array([9, 95, 95, 89, 255]);
const view = new SDataView(array.buffer);
let read;
// This will print 9, 95, 95, 89 and 255
while (read = view.readUint8()) {
    console.log("Read: ", read);
}
```