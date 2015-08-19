# Proposed updates:

A successful adoption will mean that consumers, printer and filament manufacturers can adopt the proposed standard equally easy.

## Implemented in this RC 1.5 demo

### Align data elements on byte boundaries
Embedded devices like printer control boards have limited processing and memory resources.
Also, they are programmed in C or Assembler where String handling and excessive slicing will be more complex to implement than on higher level languages. Not aligning data elements at byte boundaries will require complex en/decode routines taking a toll on processing.
On RC1.4 specs that only involves a memory toll of an additional 15 bits and reduces code size dramaticaly.

- Diameter (2 Bytes)

- Tolerance (1 Byte)
In the foreseeable future we can drive tolerances to below 0.01, so I would suggest dividing by 1000 instead of 100

- Opacity (1 Byte) would move to a definition of:
Opacity in % express in a range of 0-100

## Proposed for discussion

1) CRC checkmark for NFC and other readers
Introducing a 1 Byte CRC checkmark across the UFID Data Blob will ensure NFC or other readers will be able to verify a correct read.

2) User defined bytes
Not too sure about the intended use of the flags, but a 2 byte User defined area would make it possible for manufacturers to save batch numbers or other important information used for QC or improving Consumer experience.

3) Mixture ID
Mixture ID could reference data from http://www.matweb.com/. A global recognized source for polymer and other materials properties. All major manufacturers of polymers are listed there with full specificiations.

4) Diameter
Currently there are really only a few diameters defined as industry best practices. Defined diameters can be a lookup table, just like material and mixture IDS.
This would reduce diameter to 1 Byte
1 = 1.75mm
2 = 2.85mm
3 = 3.00mm
4-255 not yet allocated
