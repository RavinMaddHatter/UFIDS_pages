The Universal Filament identification system project goal is to produce an open source filament tracking and management system for 3d print materials. This project will consist of 3 parts: a cartridge that will interface directly with the printer, a QR code placed on the spool, and a web page for interpreting the machine code and making QR codes. This particular repo is centered on the web page. This particular version is a demo version meant to illustrate some of the proposed functionality of the webpage.

To understand the webpage you should first understand a proposed data tagging method. The QR code will contain a URL that appears as follows.

http://ufids.org/#{a-long-hexidecimal-string}

