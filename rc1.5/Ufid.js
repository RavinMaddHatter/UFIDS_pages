function Ufid (){

    // UFID Structure
    this._version_bytes=1;
    this._flags_bytes=1;
    this._nominal_diameter_bytes=2;
    this._tolerance_bytes=1;
    this._glass_transition_temp_bytes=1;
    this._print_temp_bytes=2;
    this._minimum_extrusion_temp_bytes=1;
    this._do_not_exceed_temp_bytes=2;
    this._chamber_temp_bytes=1;
    this._bed_temp_bytes=1;
    this._color_bytes=3;
    this._opacity_bytes=1;
    this._material_properties_bytes=1;
    this._mixture_id_bytes=1;
    this._volume_bytes=2;
    this._gtin_bytes=5;

    // Default Values
    this.version = 1; // Version RC1
    this.flags = 0;   // User Defined
    this.diameter = 0; // mm/100
    this.tolerance = 0;  // mm/100
    this.glass_transition_temp = 0; // Degrees C
    this.print_temp = 0; // Degrees C
    this.minimum_extrusion_temp = 0; // Degrees C
    this.do_not_exceed_temp = 0; // Degrees C
    this.chamber_temp = 0; // Degrees C
    this.bed_temp = 0; // Degrees C
    this.color = 0; // Hex Color Code
    this.opacity = 0; // Opacity in percent
    this.material_properties = 0;
    this.mixture_id = 0;
    this.volume = 0; // Volume = Encoded Volume / 10
    this.gtin = 0; // EAN13
    this.human_readable_string="";

    // Assign from constructor
    for (var attrname in arguments[0]) { this[attrname] = arguments[0][attrname]; }

}

Ufid.prototype = {
    get ufid(){ return this.encode(); }, set ufid(ufid){ this.decode(ufid);}
};

Ufid.prototype.encode = function() {

    var ufidBlob;

    function toHex (num, len){
        var hex = "0000000000" + num.toString(16);
        return hex.substring(hex.length-len*2);
    }

    ufidBlob = toHex(this.version,this._version_bytes) +
        toHex(this.flags,this._flags_bytes) +
        toHex(this.diameter*100,this._nominal_diameter_bytes) +
        toHex(this.tolerance*1000,this._tolerance_bytes) +
        toHex(this.glass_transition_temp,this._glass_transition_temp_bytes) +
        toHex(this.print_temp == 0x0 ? 0x0 : this.print_temp-100,this._print_temp_bytes) +
        toHex(this.minimum_extrusion_temp == 0x0 ? 0x0 : this.minimum_extrusion_temp-50,this._minimum_extrusion_temp_bytes) +
        toHex(Math.round(this.do_not_exceed_temp/2),this._do_not_exceed_temp_bytes) +
        toHex(this.chamber_temp,this._chamber_temp_bytes) +
        toHex(this.bed_temp,this._bed_temp_bytes) +
        toHex(this.color,this._color_bytes) +
        toHex(this.opacity,this._opacity_bytes) +
        toHex(this.material_properties,this._material_properties_bytes) +
        toHex(this.mixture_id,this._mixture_id_bytes) +
        toHex(this.volume*10,this._volume_bytes) +
        toHex(this.gtin == 0x0 ? 0x0 : Number(String(this.gtin).substring(0,String(this.gtin).length-1)) ,this._gtin_bytes);
    if (this.human_readable_string.length > 0) ufidBlob = ufidBlob.toUpperCase() + "~" + this.human_readable_string.substring(0,20).replace(/ /g,"+");

    return ufidBlob;
};

Ufid.prototype.decode = function(ufid) {

    function gtinCheckDigit(gtin)
    {

        function reverse(s) {
            var splitext = s.split("");
            var revertext = splitext.reverse();
            return revertext.join("");
        }

        var result = 0, rs = reverse(gtin);
        for (var counter = 0; counter < rs.length; counter++) {
            result = result + parseInt(rs.charAt(counter)) * Math.pow(3, ((counter + 1) % 2));
        }
        return (10 - (result % 10)) % 10;
    }

    var offset = 0;
    this.version = parseInt(ufid.substr(offset, -offset + (offset+=(this._version_bytes*2))),16);
    this.flags = parseInt(ufid.substr(offset, -offset +  (offset+=(this._flags_bytes*2))),16);
    this.diameter = parseInt(ufid.substr(offset, -offset + (offset+=(this._nominal_diameter_bytes*2))),16);
    this.diameter = this.diameter == 0 ? 0 : this.diameter/100;
    this.tolerance = parseInt(ufid.substr(offset, -offset + (offset+=(this._tolerance_bytes*2))),16);
    this.tolerance = this.tolerance == 0 ? 0 : this.tolerance/1000;
    this.glass_transition_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._glass_transition_temp_bytes*2))),16);
    this.print_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._print_temp_bytes*2))),16);
    this.print_temp = this.print_temp == 0 ? 0 : this.print_temp+100;
    this.minimum_extrusion_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._minimum_extrusion_temp_bytes*2))),16);
    this.minimum_extrusion_temp = this.minimum_extrusion_temp == 0 ? 0 : this.minimum_extrusion_temp+50;
    this.do_not_exceed_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._do_not_exceed_temp_bytes*2))),16);
    this.do_not_exceed_temp = this.do_not_exceed_temp == 0 ? 0 : this.do_not_exceed_temp *2;
    this.chamber_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._chamber_temp_bytes*2))),16);
    this.bed_temp = parseInt(ufid.substr(offset, -offset + (offset+=(this._bed_temp_bytes*2))),16);
    this.color= parseInt(ufid.substr(offset, -offset + (offset+=(this._color_bytes*2))),16);
    this.opacity = parseInt(ufid.substr(offset, -offset + (offset+=(this._opacity_bytes*2))),16);
    this.material_properties = parseInt(ufid.substr(offset, -offset + (offset+=(this._material_properties_bytes*2))),16);
    this.mixture_id = parseInt(ufid.substr(offset, -offset + (offset+=(this._mixture_id_bytes*2))),16);
    this.volume = parseInt(ufid.substr(offset, -offset + (offset+=(this._volume_bytes*2))),16);
    this.volume = this.volume == 0 ? 0 : this.volume/10;
    this.gtin = parseInt(ufid.substr(offset, -offset + (offset+=(this._gtin_bytes*2))),16);
    this.gtin = this.gtin == 0 ? 0 : Number(this.gtin.toString() + gtinCheckDigit(this.gtin.toString()));
    this.human_readable_string=ufid.substr(offset+1).replace(/\+/g," ");

    return true;
};

/* Tests
 a = new Ufid({
 bed_temp: 60,
 chamber_temp: 100,
 color: 0x111111,
 diameter: 2.85,
 do_not_exceed_temp: 280,
 gtin: 4716779449280,
 glass_transition_temp: 160,
 human_readable_string: "ExcelFil Arctic Silver",
 minimum_extrusion_temp: 190,
 print_temp: 210,
 tolerance: 0.03,
 volume: 100
 }
 );
 console.log(a.ufid);
 a.ufid = a.ufid;
 console.log(a);
 */
