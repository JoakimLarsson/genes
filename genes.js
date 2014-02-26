// Get the full name with correct order of non family names
function getFullNames(who, when){
    if (who == undefined){
	return "?";
    }
    if (familj[who] == undefined){
	return who;
    }
    if (familj[who]["nameOrder"] == "flipped"){
	name = familj[who]["name2"] + " <B>" + familj[who]["name"] + "</B>";
    }
    else if (familj[who]["nameOrder"] != undefined){
	name = "<B>" + familj[who]["name"] + "</B> " + familj[who]["name2"];
    } 
    else{
	name = "<B>" + familj[who]["name"] + "</B>";
    }
    if (when == "birth" && familj[who]["lastName"] != undefined){
	name = name + " " + familj[who]["lastName"];
    }
    else if (when == "all" && familj[who]["lastName"] != undefined){
	name = name + " " + familj[who]["lastName"];
	if (familj[who]["lastName2"] != undefined){
            name = name + "/" + familj[who]["lastName2"];
	    if (familj[who]["lastName3"] != undefined){
		name = name + "/" + familj[who]["lastName3"];
		if (familj[who]["lastName4"] != undefined){
		    name = name + "/" + familj[who]["lastName4"];
		}
            }
	}
    }
    else{
	if (familj[who]["lastName2"] != undefined){
	    name = name + " " + familj[who]["lastName2"];
	}
    }
    
    return name;
}

function getLifeTime(who, what){
    var lifetime="";
    
    if (who == undefined || familj[who] == undefined){
	return "";
    }
    if (what == "years"){
	if (familj[who]["birthYear"] != undefined){
	    lifetime = familj[who]["birthYear"] + "-";
	}
	else {
	    lifetime= "?-";
	}
	if (familj[who]["deathYear"] != undefined){
	    lifetime = lifetime + familj[who]["deathYear"];
	}
    }
    else{
	if (familj[who]["birthDate"] != undefined ){
	    lifetime = familj[who]["birthDate"] + " ";
	}
	if (familj[who]["birthYear"] != undefined ){
	    lifetime = lifetime + familj[who]["birthYear"] + "-";
	}
	else {
	    lifetime= lifetime + "?-";
	}
	if (familj[who]["deathDate"] != undefined ){
	    lifetime = lifetime + familj[who]["deathDate"] + " ";
	}
	if (familj[who]["deathYear"] != undefined){
	    lifetime = lifetime + familj[who]["deathYear"];
	}
	else {
	    lifetime= lifetime + "?";
	}
    }
    
    return lifetime;
}

function getDad(who){
    var dad;
    
    if (who != undefined && familj[who] != undefined){
	dad = familj[who]["dad"];
    }
    else
    {
	dad = undefined;
    }
    return dad;
}

function getMom(who){
    var mom;
    
    if (who != undefined && familj[who] != undefined){
	mom = familj[who]["mom"];
    }
    else
    {
	mom = undefined;
    }
    return mom;
}

function renderMe(who, level){
    if (level == 1){
	renderInfo(who);
    }
    else{
	renderTree(who, level);
	renderKids(who, level);
    }
    document.close();
}

function renderInfo(who){
    var mom = getMom(who);
    var dad = getDad(who);
    
    document.write("<center><H1>");
    document.write("<A HREF=\"javascript:renderMe('" + who + "'," + 4 + ")\">");
    
    document.write(getFullNames(who, "all"));
    //  document.write(" (" + getLifeTime(who, "years") + ")");
    document.write("</A></H1>");
    
    document.write("<table width=\"100%\"><tr><td align=\"center\" width=\"25%\">");
    
    document.write("<table bgcolor=\"#888888\" width=\"100%\">");
    document.write("<tr><td>Lived:</td><td>" +  getLifeTime(who, "dates"));
    if (familj[who]["birthPlace"] != undefined){
	document.write(", " + familj[who]["birthPlace"]);
    }
    document.write("</TD></TR>");
    if (familj[who]["occupation"] != undefined){
	document.write("<TR><TD>Occupation:</TD><TD>" + familj[who]["occupation"] + "</TD></TR>");
    }
    document.write("<tr><td>Mother:</td><td>");
    if (mom != undefined && familj[mom] != undefined){
	document.write("<A HREF=\"javascript:renderMe('" + mom + "'," + 1 + ")\">");
    }
    document.write(getFullNames(mom, "birth"));
    document.write("</A></TD></TR>");
    
    document.write("<tr><td>Father:</td><td>");
    if (dad != undefined && familj[dad] != undefined){
	document.write("<A HREF=\"javascript:renderMe('" + dad + "'," + 1 + ")\">");
    }
    document.write(getFullNames(dad, "birth"));
    document.write("</A></TD></TR>");
    document.write("<tr><td COLSPAN=2>");
    renderKids(who, 1);
    document.write("<BR>");
    renderSiblings(who);
    document.write("<BR>");
    renderCousines(who);
    document.write("</TD></TR>");
    document.write("</table>");
    
    document.write("</td><td valign=bottom align=\"center\" width=50%>");
    if (familj[who]["comments"] != undefined){
	document.write("<font size=\"+1\">" + familj[who]["comments"] + "</font>");
    }
    if (familj[who]["source"] != undefined){
	document.write("<BR><BR><font size=\"-1\">Källor: " + familj[who]["source"] + "</font>");
    }
    document.write("</TD>");
    document.write("<td ALIGN=CENTER width=\"25%\">" + getPortraitImg(who));
    document.write("</TD></tr></TABLE>");
    
    return "";
}

function getCousines(who){
    var msiblings = new Array;
    var psiblings = new Array;
    var cousines = new Array;
    
    if (who != undefined){
	if (familj[who] != undefined){ 
	    if (familj[who]["mom"] != undefined){
		msiblings = getSiblings(familj[who]["mom"]); 
	    }
	    if (familj[who]["dad"] != undefined){
		psiblings = getSiblings(familj[who]["dad"]); 
	    }
	}
	for (var i in familj){
	    if (familj[i] != undefined) {
		if (familj[i]["mom"] != undefined &&
		    (msiblings[familj[i]["mom"]] != undefined || psiblings[familj[i]["mom"]] != undefined)){
		    cousines[i] = "x";
		}
		
		if (familj[i]["dad"] != undefined && 
		    (msiblings[familj[i]["dad"]] != undefined || psiblings[familj[i]["dad"]] != undefined)){
		    cousines[i] = "x";
		}
	    }
	}
    }
    return cousines;
}

function getSiblings(who){
    var siblings = new Array;
    
    for (var i in familj){
	if (i != who && familj[who]  != undefined){ 
	    if (familj[who]["mom"] != undefined){
		if ( familj[i]["mom"] != undefined && 
		     familj[i]["mom"] == familj[who]["mom"]){
		    siblings[i] = "x";
		}
	    }
	    if (familj[who]["dad"] != undefined){
		if ( familj[i]["dad"] != undefined && 
		     familj[i]["dad"] == familj[who]["dad"]){
		    siblings[i] = "x";
		}
	    }
	}
    }
    return siblings;
}

function renderSiblings(who){
    var siblings = new Array;
    var antal = 0;
    
    siblings = getSiblings(who);
    for (var i in siblings){
	if (antal == 0)
	{
	    document.write("<FONT SIZE=-1>Siblings:</FONT><BR>");
	    antal++;
	}
	document.write("<A HREF=\"javascript:renderMe('" + i + "'," + 1 + ")\"><NOBR>");
	document.write("<FONT SIZE=-2>" + getFullNames(i, "birth"));
	document.write(" (" + getLifeTime(i, "years"));
	if (familj[i]["birthPlace"] != undefined){
	    document.write("," + familj[i]["birthPlace"]);
	}
	document.write(")");
	if (familj[i]["occupation"] != undefined){
	    document.write(", " + familj[i]["occupation"]);
	}
	document.write("</NOBR></A></FONT><BR>");
    }
}

function renderCousines(who){
    var cousines = new Array;
    var antal = 0;
    
    cousines = getCousines(who);
    for (var i in cousines){
	if (antal == 0)
	{
	    document.write("<FONT SIZE=-1>Cousines:</FONT><BR>");
	    antal++;
	}
	document.write("<A HREF=\"javascript:renderMe('" + i + "'," + 1 + ")\"><NOBR>");
	document.write("<FONT SIZE=-2>" + getFullNames(i, "birth"));
	document.write(" (" + getLifeTime(i, "years"));
	if (familj[i]["birthPlace"] != undefined){
	    document.write("," + familj[i]["birthPlace"]);
	}
	document.write(")");
	if (familj[i]["occupation"] != undefined){
	    document.write(", " + familj[i]["occupation"]);
	}
	document.write("</NOBR></A></FONT><BR>");
    }
}

function renderKids(who, level){
    var barn = 0;
    for (var i in familj){
	if (familj[i]        != undefined){ 
	    if ( (familj[i]["mom"] != undefined && familj[i]["mom"] == who) ||
		 (familj[i]["dad"] != undefined && familj[i]["dad"] == who) ){
		if (barn == 0){
		    document.write("<FONT SIZE=-1>Children:</FONT><BR>");
		    barn++;
		}
		document.write("<A HREF=\"javascript:renderMe('" + i + "'," + level + ")\"><NOBR>");
		document.write("<FONT SIZE=-2>" + getFullNames(i, "birth"));
		document.write(" (" + getLifeTime(i, "years"));
		if (familj[i]["birthPlace"] != undefined){
		    document.write("," + familj[i]["birthPlace"]);
		}
		document.write(")");
		if (familj[i]["occupation"] != undefined){
		    document.write(", " + familj[i]["occupation"]);
		}
		document.write("</NOBR></FONT></A><BR>");
	    }
	}
    }
    return "";
}

function getPortraitUrl(who){
    var url;
    
    if (familj[who]["portrait"] != undefined){
	url = familj[who]["portrait"];
    }
    else
    {
	url = "";
    }
    return url;
}

function getPortraitImg(who){
    var img = "";
    if (who != undefined && familj[who] != undefined && familj[who]["portrait"] != undefined){
	img = "<IMG BORDER=0 SRC=\"" + getPortraitUrl(who) + "\">";
    }
    return img;
}

function renderTree(who, level){
    var ppl = new Array;
    var i, j = 0;
    ppl[j] = who;
    var pops;
    
    pops = 1;
    for (i=0; i < level; i++){ pops = pops * 2; }
    pops -= 1;
    
    for (i = 1; i<pops; i++){
	if (i & 1){
	    ppl[i] = getDad(ppl[j]);
	}
	else{
	    //      document.write("m");
	    ppl[i] = getMom(ppl[j]);
	    j++;
	}
    }
    i--;
    cspan = 1;
    pops = pops + 1;
    unit = (100 - (100 % (pops))) / pops;
    iwstep = 60 / level;
    iw = 60 - iwstep;
    j = 0;
    document.write("<TABLE BORDER=0 CELLPADDING=5 WIDTH=100%>\n");  
    for(i = i; i >= 0; i--){
	if (j == 0){
	    document.write("<TR>\n");
	    cspan = cspan * 2;
	    pops = pops / 2;
	    unit = unit * 2;
	    iw   = iw + iwstep;
	    j = pops;
	}
	document.write("<TD WIDTH=\"" + unit + "%\"");
	if (ppl[i] != undefined && familj[ppl[i]] != undefined && familj[ppl[i]]["portrait"] != undefined){
            document.write("VALIGN=TOP ");
	}
	else{
            document.write("VALIGN=CENTER ");
	}
	document.write("ALIGN=CENTER COLSPAN=" + cspan + ">");
	if (ppl[i] != undefined && familj[ppl[i]] != undefined){     
	    if (pops == 1){
		if (familj[ppl[i]]["html"] != undefined){
		    document.write("<A HREF=\"" + familj[ppl[i]]["html"] + "\">");
		}
		else{
		    document.write("<A HREF=\"javascript:renderMe('" + ppl[i] + "'," + 1 + ")\">");
		}
	    }
	    else{
		document.write("<A HREF=\"javascript:renderMe('" + ppl[i] + "'," + 4 + ")\">");
	    }
	    
	    if (familj[ppl[i]]["portrait"] != undefined){
		document.write("<IMG BORDER=0 WIDTH=\"");
		document.write(Math.ceil(iw) + "\" SRC=\"" + familj[ppl[i]]["portrait"] + "\"><BR>");
	    }
	    document.write("<FONT SIZE=-2>" + getFullNames(ppl[i], "birth"));
	    document.write(" (" + getLifeTime(ppl[i], "years"));
	    if (familj[ppl[i]]["birthPlace"] != undefined){
		document.write("," + familj[ppl[i]]["birthPlace"]);
	    }
	    document.write(")");
	    if (familj[ppl[i]]["occupation"] != undefined){
		document.write(", " + familj[ppl[i]]["occupation"]);
	    }
	    document.write("</A>");	    
	}
	else{
	    if (ppl[i] != undefined){
		document.write(ppl[i]);
	    }
	    else{
		document.write("?");
	    }
	}
	document.write( "</FONT><BR>\n");
	j--;
    }
    document.write("</TABLE>");
    
    return "";
}

var familj = new Array();

// Henry VIII
familj["henryviii"] = new Array();
familj["henryviii"]["name2"]     = "";            // Second names
familj["henryviii"]["name"]      = "Henry VIII";  // Common name
familj["henryviii"]["nameOrder"] = "stright";     // stright == second name comes first, flipped == second names comes second
familj["henryviii"]["lastName"]  = "of Tudor";    // Lastname as borned
familj["henryviii"]["lastName2"] = "";            // Lastname as married
familj["henryviii"]["birthYear"] = "1491";        
familj["henryviii"]["birthDate"] = "28/6";
familj["henryviii"]["birthPlace"]= "Greenwich Palace, Greenwich";
familj["henryviii"]["deathYear"] = "1547";
familj["henryviii"]["deathDate"] = "28/1";
familj["henryviii"]["deathPlace"]= "Palace of Whitehall, London";
familj["henryviii"]["mom"]     = "elisabethofyork"; // Unique names required to refer to parents
familj["henryviii"]["dad"]     = "henryvii";
familj["henryviii"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Workshop_of_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg/341px-Workshop_of_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg";
familj["henryviii"]["occupation"]  = "By the Grace of God, King of England and France, Defender of the Faith, Lord of Ireland, and of the Church of England and of Ireland in Earth Supreme Head";
familj["henryviii"]["comments"]  = "Besides his six marriages, Henry VIII is known for his role in the separation of the Church of England from the Roman Catholic Church.";
familj["henryviii"]["source"]    = "http://en.wikipedia.org/wiki/Henry_VIII_of_England";

// Henry VII
familj["henryvii"] = new Array();
familj["henryvii"]["name2"]     = "";            
familj["henryvii"]["name"]      = "Henry VII";   
familj["henryvii"]["nameOrder"] = "stright";     
familj["henryvii"]["lastName"]  = "of Tudor";    
familj["henryvii"]["lastName2"] = "";            
familj["henryvii"]["birthYear"] = "1457";        
familj["henryvii"]["birthDate"] = "28/1";
familj["henryvii"]["birthPlace"]= "Pembroke Castle, Wales";
familj["henryvii"]["deathYear"] = "1509";
familj["henryvii"]["deathDate"] = "21/4";
familj["henryvii"]["deathPlace"]= "Richmond Palace, England";
familj["henryvii"]["mom"]     = "Lady Margaret Beaufort";
familj["henryvii"]["dad"]     = "Edmond Tudor";
familj["henryvii"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/King_Henry_VII.jpg/405px-King_Henry_VII.jpg";
familj["henryvii"]["occupation"]  = "King of England and of France and Lord of Ireland";
familj["henryvii"]["comments"]  = "Henry won the throne when his forces defeated Richard III at the Battle of Bosworth Field and was the last king of England to win his throne on the field of battle.";
familj["henryvii"]["source"]    = "http://en.wikipedia.org/wiki/Henry_VII_of_England";

// Elisabeth of York
familj["elisabethofyork"] = new Array();
familj["elisabethofyork"]["name2"]     = "";            
familj["elisabethofyork"]["name"]      = "Elisabeth";   
familj["elisabethofyork"]["nameOrder"] = "stright";     
familj["elisabethofyork"]["lastName"]  = "of York";    
familj["elisabethofyork"]["lastName2"] = "";            
familj["elisabethofyork"]["birthYear"] = "1466";        
familj["elisabethofyork"]["birthDate"] = "11/2";
familj["elisabethofyork"]["birthPlace"]= "Westminster Palace";
familj["elisabethofyork"]["deathYear"] = "1503";
familj["elisabethofyork"]["deathDate"] = "11/2";
familj["elisabethofyork"]["deathPlace"]= "Richmond Palace, England";
familj["elisabethofyork"]["mom"]     = "Elizabeth Woodville";
familj["elisabethofyork"]["dad"]     = "Edward IV of England";
familj["elisabethofyork"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Elizabeth_of_York_from_Kings_and_Queens_of_England.jpg/435px-Elizabeth_of_York_from_Kings_and_Queens_of_England.jpg";
familj["elisabethofyork"]["occupation"]  = "Queen consort of England";
familj["elisabethofyork"]["comments"]  = "She is the most recent common ancestor of all English and Scottish monarchs, which reigned after James VI and I";
familj["elisabethofyork"]["source"]    = "http://en.wikipedia.org/wiki/Elizabeth_of_York";

// Mary I of England
familj["bloodymary"] = new Array();
familj["bloodymary"]["name2"]     = "";            
familj["bloodymary"]["name"]      = "Mary I";   
familj["bloodymary"]["nameOrder"] = "stright";     
familj["bloodymary"]["lastName"]  = "of Tudor";    
familj["bloodymary"]["lastName2"] = "";            
familj["bloodymary"]["birthYear"] = "1516";        
familj["bloodymary"]["birthDate"] = "18/2";
familj["bloodymary"]["birthPlace"]= "Palace of Placentia, Greenwich";
familj["bloodymary"]["deathYear"] = "1558";
familj["bloodymary"]["deathDate"] = "17/11";
familj["bloodymary"]["deathPlace"]= "St James's Palace, London";
familj["bloodymary"]["mom"]     = "Catherine of Aragon";
familj["bloodymary"]["dad"]     = "henryviii";
familj["bloodymary"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Maria_Tudor1.jpg/453px-Maria_Tudor1.jpg";
familj["bloodymary"]["occupation"]  = "By the Grace of God, King and Queen of England, Spain, France, Jerusalem, both the Sicilies and Ireland, Defenders of the Faith, Archduke and Archduchess of Austria, Duke and Duchess of Burgundy, Milan and Brabant, Count and Countess of Habsburg, Flanders and Tyrol";
familj["bloodymary"]["comments"]  = "Her executions of Protestants caused her opponents to give her the sobriquet \"Bloody Mary\".";
familj["bloodymary"]["source"]    = "http://en.wikipedia.org/wiki/Mary_I_of_England";

// Henty FitzRoy
familj["henryfitzroy"] = new Array();
familj["henryfitzroy"]["name2"]     = "";            
familj["henryfitzroy"]["name"]      = "Henry";   
familj["henryfitzroy"]["nameOrder"] = "stright";     
familj["henryfitzroy"]["lastName"]  = "FitzRoy";
familj["henryfitzroy"]["lastName2"] = "";            
familj["henryfitzroy"]["birthYear"] = "1519";        
familj["henryfitzroy"]["birthDate"] = "15/6";
familj["henryfitzroy"]["birthPlace"]= "Blackmore, Essex";
familj["henryfitzroy"]["deathYear"] = "1536";
familj["henryfitzroy"]["deathDate"] = "23/7";
familj["henryfitzroy"]["deathPlace"]= "Thetford, Norfolk";
familj["henryfitzroy"]["mom"]     = "Elizabeth Blount";
familj["henryfitzroy"]["dad"]     = "henryviii";
familj["henryfitzroy"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/9/9e/Horenbout_HenryFitzRoy.jpg";
familj["henryfitzroy"]["occupation"]  = "Duke of Richmond and Somerset Earl of Nottingham";
familj["henryfitzroy"]["comments"]  = "He was the son of King Henry VIII of England and his mistress Elizabeth Blount, and the only illegitimate offspring whom Henry acknowledged.";
familj["henryfitzroy"]["source"]    = "http://en.wikipedia.org/wiki/Henry_FitzRoy,_1st_Duke_of_Richmond_and_Somerset";

// Elisabeth Tudor
familj["elisabethtudor"] = new Array();
familj["elisabethtudor"]["name2"]     = "";            
familj["elisabethtudor"]["name"]      = "Elisabeth";   
familj["elisabethtudor"]["nameOrder"] = "stright";     
familj["elisabethtudor"]["lastName"]  = "of Tudor";
familj["elisabethtudor"]["lastName2"] = "";            
familj["elisabethtudor"]["birthYear"] = "1533";        
familj["elisabethtudor"]["birthDate"] = "7/9";
familj["elisabethtudor"]["birthPlace"]= "Palace of Placentia, Greenwich, England";
familj["elisabethtudor"]["deathYear"] = "1603";
familj["elisabethtudor"]["deathDate"] = "24/3";
familj["elisabethtudor"]["deathPlace"]= "Richmond Palace";
familj["elisabethtudor"]["mom"]     = "Anne Boleyn";
familj["elisabethtudor"]["dad"]     = "henryviii";
familj["elisabethtudor"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Darnley_stage_3.jpg/410px-Darnley_stage_3.jpg";
familj["elisabethtudor"]["occupation"]  = "By the Grace of God, Queen of England, France and Ireland, Defender of the Faith, etc.";
familj["elisabethtudor"]["comments"]  = "She was sometimes called \"The Virgin Queen\", \"Gloriana\" or \"Good Queen Bess\" and was the fifth and last monarch of the Tudor dynasty.";
familj["elisabethtudor"]["source"]    = "http://en.wikipedia.org/wiki/Elizabeth_I_of_England";

// Edward VI
familj["edwardvi"] = new Array();
familj["edwardvi"]["name2"]     = "";            
familj["edwardvi"]["name"]      = "Edward VI";   
familj["edwardvi"]["nameOrder"] = "stright";     
familj["edwardvi"]["lastName"]  = "of Tudor";
familj["edwardvi"]["lastName2"] = "";            
familj["edwardvi"]["birthYear"] = "1537";        
familj["edwardvi"]["birthDate"] = "12/10";
familj["edwardvi"]["birthPlace"]= "Hampton Court Palace, Middlesex, England";
familj["edwardvi"]["deathYear"] = "1553";
familj["edwardvi"]["deathDate"] = "6/7";
familj["edwardvi"]["deathPlace"]= "Greenwich Palace, Kent, England";
familj["edwardvi"]["mom"]     = "Jane Seymour";
familj["edwardvi"]["dad"]     = "henryviii";
familj["edwardvi"]["portrait"]  = "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Portrait_of_Edward_VI_of_England.jpg/474px-Portrait_of_Edward_VI_of_England.jpg";
familj["edwardvi"]["occupation"]  = "By the Grace of God, King of England, France and Ireland, Defender of the Faith, and of the Church of England and of Ireland in Earth Supreme Head";
familj["edwardvi"]["comments"]  = "He was crowned at the age of nine.";
familj["edwardvi"]["source"]    = "http://en.wikipedia.org/wiki/Edward_VI_of_England";
