The Universal Filament identification system project goal is to produce an open source filament tracking and management system for 3d print materials. This project will consist of 3 parts: a cartridge that will interface directly with the printer, a QR code placed on the spool, and a web page for interpreting the machine code and making QR codes. This particular repo is centered on the web page. This particular version is a demo version meant to illustrate some of the proposed functionality of the webpage.

To understand the webpage you should first understand a proposed data tagging method. The QR code will contain a URL that appears as follows.

http://ufids.org/#{a-long-hexidecimal-string}

The part in curly braces will contain all of the data that the printer needs to operate, it will be formatted in such a way that the programing for the cartridge can be programed directly with this hex string. The hex string will be formatted as flows.

{Version Number} {Filament Diameter} {Tolerance} {Print Temp} {Scorch Temp} {Platform Temperature} {Chamber Temp} {Manufacture ID} {UPC} {Mixture} {Volume of Filament}

Each variable has a specific number of allocated bit to provide and adequate amount of data, but also keep the code as compact as possible. The bit allocation is as follows.

Version: 8 Bits 
Diameter: 9 Bits (stored as diameter/100)
Tolerance: 7 Bits (stored as Tolerance/100)
Print Temp : 8 Bits (stored as Print temp-100)
Scorch Temp: 8 Bits  (stored as Scorch Temp- Print Temp)
Platform temp: 8 Bits
Chamber Temp: 8 Bits
Manufacture ID: 24 Bits
Mixture: 8 Bits
UPC: 40 Bits
Volume: 8 Bits

The packaging and decoding of the hex string is handled by the page in this repo.
