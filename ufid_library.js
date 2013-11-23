function UFID (type) {
//All of the bit lengths are defined here. 
	this._version_bit_length=8;
	this._flags_bit_length=8;
	this._nominal_diameter_bit_length=9;
	this._tolerance_bit_length=7;
	this._glass_transition_temp_bit_length=8;
	this._print_temp_bit_length=8;
	this._minimum_extrusion_temp_bit_length=8;
	this._do_not_exceed_temp_bit_length=8;
	this._chamber_temp_bit_length=8;
	this._bed_temp_bit_length=8;
	this._color_bit_length=24;
	this._opacity_bit_length=3;
	this._material_properties_bit_length=5;
	this._mixture_id_bit_length=8;
	this._volume_bit_length=16;
	this._gtin_bit_length=40;
	this._full_bit_length=this._version_bit_length + this._flag_bit_length + this._nominal_diameter_bit_length + this._tolerance_bit_length + this._glass_transition_temp_bit_length + this._print_temp_bit_length + this._minimum_extrusion_temp_bit_length + this._do_not_exceed_temp_bit_length + this._chamber_temp_bit_length + this._bed_temp_bit_length + this._color_bit_length + this._opacity_bit_length + this._material_properties_bit_length + this._mixture_id_bit_length + this._volume_bit_length + this._gtin_bit_length;
	
	this.numbers_test = /^[0-9]+$/; 
	this.hex_test = /^[0-9a-fA-F]+$/;
	
	
	function bin2hex (s){
        // as we choose to use low level data to drive the format, this function was writen to convert binary to hexidecimal
		var i, l, o = "", n;

		s += "";
	
		for (i = 0, l = s.length/4; i < l; i++) {
			n=s.slice(i*4,(i+1)*4);
			n=parseInt(n,2);
			o=o+n.toString(16);
		}

		return o;
	}

	function hex2bin(s){
	// as low level bit logic is not truely native to Javascript this function was written to covert hexidecimal numbers to binary
		var i, l, o = "", n,a;
		s += "";
		for (i = 0, l = s.length; i < l; i++) {
			n=s.slice(i,(i+1));
			n=parseInt(n,16);
			a=n.toString(2);
			while(a.length<4){
                a='0'+a;
			}
        o=o+a;
		}
		return o;
	}
	
	this.interpret_binary = function(){
        //When the user passes binary data to the program, either in the form of a manual entered hexidecemal number or in the form of a QR that was scanned, this function is called, this function slices the binary data then decodes the data into a human readable format
        var start,bin_gtin,bin_mixture_id,bin_volume,bin_material_properties;
		var bin_opacity, bin_color, bin_bed_temp, bin_chamber_temp, bin_do_not_exceed_temp;
		var bin_minimum_extrusion_temp, bin_print_temp,bin_glass_transition_temp;
		var bin_tolerance, bin_diameter, bin_diameter, bin_flags,bin_version;
        if(/(^[0-9A-Fa-f]{6}$)/i.test('p')){
		
		}
		
		binary=hex2bin(this.hex);
        start=0;

		
        // The slicing starts here 
        bin_version = binary.slice(start,this._version_bit_length);
        start = start + this._version_bit_length;
		
        bin_flags = binary.slice(start,start+this._flags_bit_length);
        start = start+this._flag_bit_length;
		
        bin_diameter=binary.slice(start,start+this._nominal_diameter_bit_length);
        start = start+this._nominal_diameter_bit_length;
        
		bin_tolerance = binary.slice(start,start+this._tolerance_bit_length);
        start = start+this._tolerance_bit_length;
        
		bin_glass_transition_temp = binary.slice(start,start+this._glass_transition_temp_bit_length);
        start=start+this._glass_transition_temp_bit_length;
        
		bin_print_temp = binary.slice(start,start+this._print_temp_bit_length);
		start = start + this._print_temp_bit_length;
		
		bin_minimum_extrusion_temp=binary.slice(start,start+this._minimum_extrusion_temp_bit_length);
        start=start+this._minimum_extrusion_temp_bit_length;
        
		bin_do_not_exceed_temp=binary.slice(start,start+this._do_not_exceed_temp_bit_length);
        start=start+this._do_not_exceed_temp_bit_length;
        
		bin_chamber_temp = binary.slice(start,start+this._chamber_temp_bit_length);
        start=start+this._chamber_temp_bit_length;
        
		bin_bed_temp=binary.slice(start,start+this._bed_temp_bit_length)
        start=start+this._bed_temp_bit_length;
        
		bin_color=binary.slice(start, start+this._color_bit_length);
        start=start+this._color_bit_length;
        
		bin_opacity=binary.slice(start,start+this._opacity_bit_length);
		start=start+this._opacity_bit_length;
		
		bin_material_properties=binary.slice(start,start+this._material_properties_bit_length);
		start=start+this._material_properties_bit_length;
		
		bin_mixture_id=binary.slice(start,start+this._mixture_id_bit_length);
		start=start+this._mixture_id_bit_length;
		
		bin_volume=binary.slice(start,start+this._volume_bit_length);
		start=start+this._volume_bit_length;
		
		bin_gtin=binary.slice(start,start+this._gtin_bit_length);
		
        // conversion to human readable numbers 
		this.version=parseInt(bin_version,2);
		this.flags=parseInt(bin_flags,2);
        this.diameter=parseInt(bin_diameter,2)/100;
        this.tolerance=parseInt(bin_tolerance,2)/100;
        this.glass_transition_temp = parseInt(bin_glass_transition_temp,2)+50;
        this.print_temp = parseInt(bin_print_temp,2)+100;
        this.minimum_extrusion_temp=parseInt(bin_minimum_extrusion_temp,2)+50;
		this.do_not_exceed_temp=parseInt(bin_do_not_exceed_temp,2)*2;
		this.chamber_temp = parseInt(bin_chamber_temp,2);
		this.bed_temp = parseInt(bin_bed_temp,2);
		this.color = bin2hex(bin_color);
		this.opacity = parseInt(bin_opacity,2);
		this.material_properties = parseInt(bin_material_properties,2);
		this.mixture_id = parseInt(bin_mixture_id,2);
		this.volume = parseInt(bin_volume,2)/10;
		this.gtin = parseInt(bin_gtin,2);
	}
	
	this.check_values = function(){
		if(isNaN(this.version)){
			this.version=1;
		}
		if(isNaN(this.flags)){
			this.flags=0;
		}
		if(isNaN(this.diameter)){
			this.diameter=0;
		}else{
			if(!((this.diameter<=5.12)&&(this.diameter>=0))){
				this.diameter=0;
			}
		}
		if(isNaN(this.tolerance)){
			this.tolerance=0;
		}else{
			if(!((this.tolerance<=1.26)&&(this.tolerance>=0))){
				this.tolerance=0;
			}
		}
		if(isNaN(this.glass_transition_temp)){
			this.glass_transition_temp=50;
		}else{
			if(!((this.glass_transition_temp<=305)&&(this.glass_transition_temp>=50))){
				this.glass_transition_temp=50;
			}
		}
		if(isNaN(this.print_temp)){
			this.print_temp=100;
		}else{
			if(!((this.print_temp<=355)&&(this.print_temp>=100))){
				this.print_temp=100;
			}
		}
		if(isNaN(this.minimum_extrusion_temp)){
			this.minimum_extrusion_temp=50;
		}else{
			if(!((this.minimum_extrusion_temp<=355)&&(this.minimum_extrusion_temp>=100))){
				this.minimum_extrusion_temp=100;
			}
		}
		if(isNaN(this.do_not_exceed_temp)){
			this.do_not_exceed_temp=0;
		}else{
			if(!((this.do_not_exceed_temp<=510)&&(this.do_not_exceed_temp>=0))){
				this.do_not_exceed_temp=0;
			}
		}
		if(isNaN(this.chamber_temp)){
			this.chamber_temp=0;
		}else{
			if(!((this.chamber_temp<=255)&&(this.chamber_temp>=0))){
				this.chamber_temp=0;
			}
		}
		if(isNaN(this.bed_temp)){
			this.bed_temp=0;
		}else{
			if(!((this.bed_temp<=255)&&(this.bed_temp>=0))){
				this.bed_temp=0;
			}
		}
		if(!(/(^[0-9A-Fa-f]{6}$)|(^[0-9A-Fa-f]{3}$)/i.test(this.color))){
			this.color='000000';
		}
		if(isNaN(this.opacity)){
			this.opacity=0;
		}else{
			if(!((this.opacity<=100)&&(this.opacity>=0))){
				this.opacity=0;
			}
		}
		if(isNaN(this.material_properties)){
			this.material_properties=0;
		}else{
			if(!((this.material_properties<=255)&&(this.material_properties>=0))){
				this.material_properties=0;
			}
		}
		if(isNaN(this.mixture_id)){
			this.mixture_id=0;
		}else{
			if(!((this.mixture_id<=255)&&(this.mixture_id>=0))){
				this.mixture_id=0;
			}
		}
		if(isNaN(this.volume)){
			this.volume=0;
		}else{
			if(!((this.volume<=6553.5)&&(this.volume>=0))){
				this.volume=0;
			}
		}
		if(isNaN(this.material_properties)){
			this.material_properties=0;
		}else{
			if(!((this.material_properties>=0)&&(this.material_properties<=255))){
				this.material_properties=0;
			}
		}
		if(isNaN(this.gtin)){
			this.gtin=0;
		}else{
			if(!((this.gtin>=0)&&(this.gtin<=Math.pow(2,40)))){
				this.gtin=0;
			}
		}
	}
	
	this.compile_hex = function(){
		var start,bin_gtin,bin_mixture_id,bin_volume,bin_material_properties;
		var bin_opacity, bin_color, bin_bed_temp, bin_chamber_temp, bin_do_not_exceed_temp;
		var bin_minimum_extrusion_temp, bin_print_temp,bin_glass_transition_temp;
		var bin_tolerance, bin_diameter, bin_flags,bin_version,binary;
		
		this.check_values();
		
		bin_version= this.version.toString(2);
        while(bin_version.length<this._version_bit_length)
        {
                bin_version='0'+bin_version;
        }   
		
		bin_flags=this.flags.toString(2);
		while (bin_flags.length<this._flags_bit_length)
		{
			bin_flags='0'+bin_flags;
		}
		
        var raw_diameter=(this.diameter-this.diameter%.01)*100;
        bin_diameter=raw_diameter.toString(2);
        while(bin_diameter.length<this._nominal_diameter_bit_length)
        {
                bin_diameter='0'+bin_diameter;
        }
		
        var raw_tol=(this.tolerance-this.tolerance%.01)*100;
        bin_tolerance=raw_tol.toString(2);
        while(bin_tolerance.length<this._tolerance_bit_length)
        {
                bin_tolerance='0'+bin_tolerance;
        }
		
		var raw_glass_transition_temp=(this.glass_transition_temp-this.glass_transition_temp%1-50);
        bin_glass_transition_temp=raw_glass_transition_temp.toString(2);
        while(bin_glass_transition_temp.length<this._glass_transition_temp_bit_length)
        {
                bin_glass_transition_temp='0'+bin_glass_transition_temp;
        }
		
        var raw_print_temp=(this.print_temp-this.print_temp%1-100);
        bin_print_temp=raw_print_temp.toString(2);
        while(bin_print_temp.length<this._print_temp_bit_length)
        {
                bin_print_temp='0'+bin_print_temp;
        }

		var raw_minimum_extrusion_temp=(this.minimum_extrusion_temp-this.minimum_extrusion_temp%1-50);
        bin_minimum_extrusion_temp=raw_minimum_extrusion_temp.toString(2);
        while(bin_minimum_extrusion_temp.length<this._minimum_extrusion_temp_bit_length)
        {
                bin_minimum_extrusion_temp='0'+bin_minimum_extrusion_temp;
        }
		
        var raw_dne=(this.do_not_exceed_temp)/2;
        raw_dne=(raw_dne-raw_dne%1);
        bin_do_not_exceed_temp=raw_dne.toString(2);
        while(bin_do_not_exceed_temp.length<this._do_not_exceed_temp_bit_length)
        {
                bin_do_not_exceed_temp='0'+bin_do_not_exceed_temp;
        }
		
		var raw_chamber_temp=(this.chamber_temp-this.chamber_temp%1);
        bin_chamber_temp=raw_chamber_temp.toString(2);
        while(bin_chamber_temp.length<this._chamber_temp_bit_length)
        {
                bin_chamber_temp='0'+bin_chamber_temp;
        }
		
        var raw_bed_temp=(this.bed_temp-this.bed_temp%1);
        var bin_bed_temp=raw_bed_temp.toString(2);
        while(bin_bed_temp.length<this._bed_temp_bit_length)
        {
                bin_bed_temp='0'+bin_bed_temp;
        }
		
		bin_color=hex2bin(this.color);
        while(bin_color.length<this._color_bit_length)
        {
                bin_color='0'+bin_color;
        }
		
		var raw_opacity=(this.opacity/100)*8;
		raw_opacity=raw_opacity-raw_opacity%1;
		bin_opacity=raw_opacity.toString(2);
        while(bin_opacity.length<this._opacity_bit_length)
        {
                bin_opacity='0'+bin_opacity;
        }
		
        bin_material_properties=this.material_properties.toString(2);
        while(bin_material_properties.length<this._material_properties_bit_length)
        {
                bin_material_properties='0'+bin_material_properties;
        }
		
		bin_mixture_id=this.mixture_id.toString(2);
        while(bin_mixture_id.length<this._mixture_id_bit_length)
        {
                bin_mixture_id='0'+bin_mixture_id;
        }
		
		var raw_volume=this.volume.toString(2)*10;
		bin_volume=raw_volume-raw_volume%1;
        while(bin_volume.length<this._volume_bit_length)
        {
                bin_volume='0'+bin_volume;
        }
		
        bin_gtin=this.gtin.toString(2);
        while(bin_gtin.length<this._gtin_bit_length)
        {
                bin_gtin='0'+bin_gtin;
        }
        
        

        binary=bin_version+bin_flags+bin_diameter+bin_tolerance+bin_glass_transition_temp+bin_print_temp+bin_minimum_extrusion_temp+bin_do_not_exceed_temp+bin_chamber_temp+bin_bed_temp+bin_color+bin_opacity+bin_material_properties+bin_mixture_id+bin_volume+bin_gtin;
        this.hex=bin2hex(binary);
		
	}
	
	this.interpret_hash = function(){
		if(window.location.hash){
			var hash = window.location.hash.substring(1);
			var temp_array=hash.split("~");
			this.hex=temp_array[0];
			this.human_readable_string=temp_array[1].split("+").join(" ");
			this.interpret_binary();
		}else{
			this.check_values();
		}
	}
	
	this.make_url = function(){
		if(typeof(this.base_url)=="undefined"){
			this.base_url="http://ufids.org/";
		}
		this.compile_hex();
		if((typeof(this.human_readable_string)=="undefined")||!(this.human_readable_string.length>0)){
			this.url=this.base_url+"#"+this.hex;
			this.qr_url=this.base_url+"%26"+this.hex;
		}else{
			this.url=this.base_url+"#"+this.hex+"~"+this.human_readable_string.split(' ').join('+');
			this.qr_url=this.base_url+"%26"+this.hex+"~"+this.human_readable_string.split(' ').join('+');
		}
	}
}





