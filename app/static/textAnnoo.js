inpt = ''

function myFunction(projData) {
    lastActiveId = projData["lastActiveId"]
    accessedOnTime = projData["accessedOnTime"]
    currentUser = projData['currentUser']
    inpt += '<span class="textFormAlert"></span><div class="row">'+
            '<form name="savetextanno" class="form-horizontal" action="/savetextAnno" method="POST" onsubmit="return validateForm()">'+
            '<div class="col-sm-6">'+
            '<input type="hidden" id="accessedOnTime" name="accessedOnTime" value="'+accessedOnTime+'">'+
            '<input type="hidden" id="lastActiveId" name="lastActiveId" value="'+lastActiveId+'">'+
            '<input type="hidden" id="'+projData["textData"]["ID"]+'" name="id" value="'+projData["textData"]["ID"]+'">'+
            '<p class="form-group" id="'+projData["textData"]["ID"]+'"><strong>Text ID: '+projData["textData"]["ID"]+'</strong></p>'+
            '<div class="form-group">'+
            '<label class="col" for="text">Text:</label><br>'+
            '<input type="hidden" class="form-control" id="text"'+' name="text" value="'+projData["textData"]["Text"]+'">'+
            '<div class="col" style=background-color:#DCDCDC;>'+ projData["textData"]["Text"]+'</div>'+
            '</div>';
    inpt += '<div class="form-group">'+
            '<div class="col">'+
            '<button type="button" id="previous" class="btn btn-info btn-lg" onclick="previousText()">Previous</button>'+
            '<button type="button" id="next" class="btn btn-lg btn-info pull-right" onclick="nextText()">Next</button>'+
            '</div>'+
            '</div></div>';
            // already annotated data. Open form in edit mode
            if ('currentUser' in projData) {
                // console.log(projData['currentUser'])
                inpt += '<div class="col-sm-6">';
                if (projData[currentUser]["annotatedFLAG"] === 0) {
                    inpt += '<div class="col"><strong>Already Annotated: <span style="color:Tomato;">NO</span></strong></div>';
                }
                else {
                    inpt += '<div class="col"><strong>Already Annotated: <span style="color:MediumSeaGreen;">YES</span></strong></div>';
                }

                let dependendTagLabel = new Object();
                for (let [key, value] of Object.entries(projData["tagSet"])) {
                    dependendTagLabel[key] = 0;
                    inpt += '<br><div class="col '+key+'"><strong>'+key+': </strong>';
                    for (let i=0; i<value.length; i++) {
                            // Show hide categories
                        if ("tagSetMetaData" in projData) {
                            // console.log(key, value[i])
                            categoryClass = undefined;
                            notInDepencyColFLAG = 1;
                            notInDepencyCol = undefined;
                            if (key in projData["tagSetMetaData"]["categoryDependency"]) {
                                // console.log(key, value[i])
                                if (projData[currentUser][key] !== '') {
                                    delStr = '<strong>'+key+': </strong>';
                                    inpt = inpt.replace(delStr, '');
                                    
                                    categoryClass = projData["tagSetMetaData"]["categoryDependency"][key];
                                    // console.log(categoryClass);
                                    
                                    if (dependendTagLabel[key] === 0) {
                                        inpt += '<strong class="dependentTag '+categoryClass+'" id="'+categoryClass+key+'">'+key+': </strong>';
                                        dependendTagLabel[key] = 1;
                                    }
                                    if (projData[currentUser][key] === value[i]) {
                                        // console.log(key, value[i])
                                        inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                                '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }
                                    else {
                                        inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                                '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'">'+value[i]+'</label>';
                                    } 
                                }
                                else {
                                    delStr = '<strong>'+key+': </strong>';
                                    inpt = inpt.replace(delStr, '');
                                    
                                    categoryClass = projData["tagSetMetaData"]["categoryDependency"][key];
                                    // false disabled and hidden for the categories depending on their dependent
                                    // cTag contain the name of the category tag on which the dependent category depend
                                    // console.log(categoryClass.split('='));
                                    cTagFLAG = 0;
                                    getCatgAndTag = categoryClass.split('=')
                                    catg = getCatgAndTag[0];
                                    console.log(catg);
                                    if (getCatgAndTag[1].includes('|')){
                                        catgTag = getCatgAndTag[1].split('|')
                                        // console.log(catgTag, projData[currentUser][catg]);
                                        for (ct=0; ct<catgTag.length;ct++) {
                                            
                                            if (projData[currentUser][catg] == catgTag[ct]) {
                                                cTagFLAG = 1;
                                            }
                                        }
                                    }
                                    else {
                                        catgTag = getCatgAndTag[1];
                                        if (projData[currentUser][catg] == catgTag) {
                                            cTagFLAG = 1;
                                        }
                                    }
                                    if (cTagFLAG === 1) {
                                        if (dependendTagLabel[key] === 0) {
                                            inpt += '<strong class="dependentTag '+categoryClass+'" id="'+categoryClass+key+'">'+key+': </strong>';
                                            dependendTagLabel[key] = 1;
                                        }
                                        if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                        inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                                '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'">'+value[i]+'</label>';    
                                        }
                                        else {
                                            inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                                    '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'">'+value[i]+'</label>';
                                        }
                                    }
                                    else {
                                        if (dependendTagLabel[key] === 0) {
                                            inpt += '<strong class="dependentTag '+categoryClass+'" id="'+categoryClass+key+'" hidden>'+key+': </strong>';
                                            dependendTagLabel[key] = 1;
                                        }
                                        if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                            // console.log(key, value[i])
                                            inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked disabled hidden>'+
                                                    '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'" hidden>'+value[i]+'</label>';    
                                            }
                                        else {
                                            inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" disabled hidden>'+
                                                    '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'" hidden>'+value[i]+'</label>';
                                        }
                                    }
                                }
                            }
                            else if (!(key in projData["tagSetMetaData"]["categoryDependency"])) {
                                
                                for (let [k, v] of Object.entries(projData["tagSetMetaData"]["categoryDependency"])) {
                                    if (v.includes("=")) {
                                        tempV = v.split('=');
                                        // console.log(tempV);
                                        if (tempV[0] === key) {
                                            if (tempV[1].includes('|')) {
                                                tempV = tempV[1].split('|');
                                                // console.log(tempV);
                                                for (t=0; t<tempV.length; t++) {
                                                    if (tempV[t] === value[i]) {
                                                        categoryClass = v;
                                                    }
                                                }
                                            }
                                            else if (tempV[1] === value[i]) {
                                                categoryClass = v;
                                            }
                                            else {
                                                for (let [kk, vv] of Object.entries(projData["tagSetMetaData"]["categoryDependency"])) {
                                                    if (vv.includes(value[i])) {
                                                        notInDepencyColFLAG = 0;
                                                    }
                                                }
                                                if (notInDepencyColFLAG === 1) {
                                                    notInDepencyCol = v;
                                                }
                                            }
                                        }
                                        else {
                                            // console.log(key, 'not in dependency column', value[i], categoryClass, v, notInDepencyColFLAG)
                                        }
                                    }
                                    else {
                                        alert('"=" not in dependency column of the tagset file!')
                                    }
                                }
                                // Language
                                if (categoryClass === undefined && notInDepencyCol === undefined) {
                                    if (projData[currentUser][key] == value[i]) {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }
                                }
                                // NHUM
                                else if (categoryClass === undefined && notInDepencyCol !== undefined){
                                    if (projData[currentUser][key] == value[i]) {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked onclick="hideHideCategory()">'+
                                            '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" onclick="hideHideCategory()">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }

                                }
                                // HUM/PDOW
                                else if (categoryClass !== undefined){
                                    if (projData[currentUser][key] == value[i]) {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked onclick="showHideCategory(\''+categoryClass+'\')">'+
                                            '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" onclick="showHideCategory(\''+categoryClass+'\')">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }
                                }
                            }
                        }
                        else if (projData[currentUser][key] === value[i]) {
                            inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                        }
                        else if (projData[currentUser][key] === '') {
                            if (value[i].includes('NA') || value[i].includes('NC') || value[i].includes('NE') || value[i].includes('NG') || value[i].includes('None') || value[i].includes('Neutral')) {
                                inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                    '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                            }
                            else {
                                inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                        '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                            }
                        }
                        else {
                            inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                    '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                        }     
                    }
                    
                    inpt += '</div>';  
                    
                }
                key = 'Duplicate Text'
                inpt += '<br><div class="col"><strong>'+key+': </strong>';

                if (projData[currentUser]["Duplicate"] === 'Yes') {
                    inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="Yes" value="Yes" checked>'+
                            '<label class="form-check-label" for="Yes">Yes</label>'+
                            '<input class="form-check-input" type="radio" name="'+key+'" id="No" value="No">'+
                            '<label class="form-check-label" for="No">No</label>';
                }
                else { 
                    inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="Yes" value="Yes">'+
                            '<label class="form-check-label" for="Yes">Yes</label>'+
                            '<input class="form-check-input" type="radio" name="'+key+'" id="No" value="No" checked>'+
                            '<label class="form-check-label" for="No">No</label>';
                }
                inpt += '</div>';
                
                inpt += '<br><div class="col">'+
                        '<label class="col" for="text">Annotator Comment:</label>'+
                        '<div class="col">'+
                        '<input type="text" class="form-control" id="annotatorComment"'+
                        ' name="annotatorComment" value="'+projData[currentUser]["annotatorComment"]+'">'+
                        '</div>'+
                        '</div>';
            }
            // data is not annotated yet
            else {
                inpt += '<div class="col-sm-6">';
                inpt += '<div class="col"><strong>Already Annotated: <span style="color:Tomato;">NO</span></strong></div>';

                let dependendTagLabel = new Object()
                for (let [key, value] of Object.entries(projData["tagSet"])) {
                    dependendTagLabel[key] = 0;
                    // console.log(dependendTagLabel);
                    inpt += '<br><div class="col '+key+'"><strong>'+key+': </strong>';
                    for (let i=0; i<value.length; i++) {
                            // Show hide categories
                        if ("tagSetMetaData" in projData) {
                            categoryClass = undefined;
                            notInDepencyColFLAG = 1;
                            notInDepencyCol = undefined;
                            if (key in projData["tagSetMetaData"]["categoryDependency"]) {
                                delStr = '<strong>'+key+': </strong>';
                                inpt = inpt.replace(delStr, '');
                                
                                categoryClass = projData["tagSetMetaData"]["categoryDependency"][key];

                                if (dependendTagLabel[key] === 0) {
                                    inpt += '<strong class="dependentTag '+categoryClass+'" id="'+categoryClass+key+'" hidden>'+key+': </strong>';
                                    dependendTagLabel[key] = 1;
                                }

                                if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                    inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked disabled hidden>'+
                                        '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'" hidden>'+value[i]+'</label>';    
                                }
                                else {
                                    inpt += '<input class="form-check-input dependentTag '+categoryClass+'" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" disabled hidden>'+
                                            '<label class="form-check-label dependentTag" id="'+value[i]+'Label" for="'+value[i]+'" hidden>'+value[i]+'</label>';
                                }
                            }
                            else if (!(key in projData["tagSetMetaData"]["categoryDependency"])) {
                                
                                for (let [k, v] of Object.entries(projData["tagSetMetaData"]["categoryDependency"])) {
                                    if (v.includes("=")) {
                                        tempV = v.split('=');
                                        // console.log(tempV);
                                        if (tempV[0] === key) {
                                            if (tempV[1].includes('|')) {
                                                tempV = tempV[1].split('|');
                                                // console.log(tempV);
                                                for (t=0; t<tempV.length; t++) {
                                                    if (tempV[t] === value[i]) {
                                                        categoryClass = v;
                                                    }
                                                }
                                            }
                                            else if (tempV[1] === value[i]) {
                                                categoryClass = v;
                                            }
                                            else {
                                                for (let [kk, vv] of Object.entries(projData["tagSetMetaData"]["categoryDependency"])) {
                                                    if (vv.includes(value[i])) {
                                                        notInDepencyColFLAG = 0;
                                                    }
                                                }
                                                if (notInDepencyColFLAG === 1) {
                                                    notInDepencyCol = v;
                                                }
                                            }
                                        }
                                        else {
                                            // console.log(key, 'not in dependency column', value[i], categoryClass, v, notInDepencyColFLAG)
                                        }
                                    }
                                    else {
                                        alert('"=" not in dependency column of the tagset file!')
                                    }
                                }
                                // Language
                                if (categoryClass === undefined && notInDepencyCol === undefined){
                                    // console.log(key, categoryClass, value[i]);
                                    // console.log(projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i])
                                    if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                        // console.log(value[i]);
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                            '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }

                                }
                                // NHUM
                                else if (categoryClass === undefined && notInDepencyCol !== undefined){
                                    // console.log(key, categoryClass, value[i]);
                                    if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked onclick="hideHideCategory()">'+
                                            '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" onclick="hideHideCategory()">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }

                                }
                                // HUM/PDOW
                                else if (categoryClass !== undefined){
                                    console.log(key, categoryClass, value[i]);
                                    if (projData["tagSetMetaData"]["defaultCategoryTags"][key] == value[i]) {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked onclick="showHideCategory(\''+categoryClass+'\')">'+
                                            '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                                    }
                                    else {
                                        inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" onclick="showHideCategory(\''+categoryClass+'\')">'+
                                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                                    }
                                }
                            }
                        }
                        else if (value[i].includes('NA') || value[i].includes('NC') || value[i].includes('NE') || value[i].includes('NG') || value[i].includes('None') || value[i].includes('Neutral')) {
                            inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'" checked>'+
                                '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';    
                        }
                        else {
                            inpt += '<input class="form-check-input" type="radio" name="'+key+'" id="'+value[i]+'" value="'+value[i]+'">'+
                                    '<label class="form-check-label" for="'+value[i]+'">'+value[i]+'</label>';
                        }     
                    }
                    
                    inpt += '</div>';  
                    
                }
                key = 'Duplicate Text'
                inpt += '<br><div class="col"><strong>'+key+': </strong>'+
                        '<input class="form-check-input" type="radio" name="'+key+'" id="Yes" value="Yes">'+
                        '<label class="form-check-label" for="Yes">Yes</label>'+
                        '<input class="form-check-input" type="radio" name="'+key+'" id="No" value="No" checked>'+
                        '<label class="form-check-label" for="No">No</label>'+
                        '</div>';
                
                inpt += '<br><div class="col">'+
                        '<label class="col" for="text">Annotator Comment:</label>'+
                        '<div class="col">'+
                        '<input type="text" class="form-control" id="annotatorComment"'+
                        ' name="annotatorComment">'+
                        '</div>'+
                        '</div>';
            }
            inpt += '<br><button type="submit" class="btn btn-lg btn-primary pull-right btn-block">Save</button>';
            inpt += '</div>';
            inpt += '</form></div>';

    $('.textdata').append(inpt);    
}

$( document ).ready(function() {
    document.getElementById("NAG").onchange = function(){
        let aggIntensity = document.forms["savetextanno"]["Aggression Intensity"].value;
        let discRole = document.forms["savetextanno"]["Discursive Role"].value;
        if (aggIntensity !== "") {
            document.getElementById(aggIntensity).checked = false;
        }
        if (discRole !== "") {
            document.getElementById(discRole).checked = false;
        }
    };
});


function changeAggIntensity(tag) {
    // console.log(tag)
    if (tag == "NAG") {
        let aggIntensity = document.forms["savetextanno"]["Aggression Intensity"].value;
        document.getElementById(aggIntensity).checked = false;
        
    }
}

function validateForm() {
    $('.textFormAlertDiv').remove();
    textformalert = '';
    let language = document.forms["savetextanno"]["Language"].value;
    if (language == "") {
    //   alert("Language must be selected");
      textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Language must be selected</div>';
      $('.textFormAlert').append(textformalert);
      return false;
    }
    let aggression = document.forms["savetextanno"]["Aggression"].value;
    if (aggression == "") {
        // alert("Aggression must be selected");
        textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Aggression must be selected</div>';
        $('.textFormAlert').append(textformalert);
        return false;
    }
    if (aggression == "NAG") {
        let aggIntensity = document.forms["savetextanno"]["Aggression Intensity"].value;
        if (aggIntensity !== "") {
            document.getElementById(aggIntensity).checked = false;
            // return false;
        } 
    }
    if (aggression == "CAG" || aggression == "OAG") {
        let aggIntensity = document.forms["savetextanno"]["Aggression Intensity"].value;
        if (aggIntensity === "") {
            // alert("Aggression Intensity must be selected");
            textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Aggression Intensity must be selected</div>';
            $('.textFormAlert').append(textformalert);
            return false;
        }
      }
    let cast = document.forms["savetextanno"]["Caste/Class Bias"].value;
    if (cast == "") {
        // alert("Caste/Class Bias must be selected");
        textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Caste/Class Bias must be selected</div>';
            $('.textFormAlert').append(textformalert);
        return false;
    }
    let communal = document.forms["savetextanno"]["Communal Bias"].value;
    if (communal == "") {
        // alert("Communal Bias must be selected");
        textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Communal Bias must be selected</div>';
        $('.textFormAlert').append(textformalert);
        return false;
    }
    let racial = document.forms["savetextanno"]["Ethnicity/Racial Bias"].value;
    if (racial == "") {
        // alert("Ethnicity/Racial Bias must be selected");
        textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Ethnicity/Racial Bias must be selected</div>';
        $('.textFormAlert').append(textformalert);
        return false;
    }
    let gender = document.forms["savetextanno"]["Gender Bias"].value;
    if (gender == "") {
        // alert("Gender Bias must be selected");
        textformalert += '<div class="alert alert-danger textFormAlertDiv" role="alert">Gender Bias must be selected</div>';
        $('.textFormAlert').append(textformalert);
        return false;
    }
  }
  
function previousText() {
    lastActiveId = document.forms["savetextanno"]["lastActiveId"].value
        $.ajax({
            url: '/loadprevioustext',
            type: 'GET',
            data: {'data': JSON.stringify(lastActiveId)},
            contentType: "application/json; charset=utf-8", 
            success: function(response){
                window.location.reload();
            }
        });
        return false; 
}

function nextText() {
    lastActiveId = document.forms["savetextanno"]["lastActiveId"].value
        $.ajax({
            url: '/loadnexttext',
            type: 'GET',
            data: {'data': JSON.stringify(lastActiveId)},
            contentType: "application/json; charset=utf-8", 
            success: function(response){
                window.location.reload();
            }
        });
        return false; 
}

function unAnnotated() {
    unanno = '';
    $('#uNAnnotated').remove();
    $.ajax({
        url: '/allunannotated',
        type: 'GET',
        data: {'data': JSON.stringify(unanno)},
        contentType: "application/json; charset=utf-8", 
        success: function(response){
            allunanno = response.allunanno;
            allanno = response.allanno;
            var inpt = '';
            inpt += '<select class="col-sm-3 allanno" id="allanno" onchange="loadAnnoText()">'+
                    '<option selected disabled>All Annotated</option>';
                    for (i=0; i<allanno.length; i++) {
                        inpt += '<option value="'+allanno[i]["textId"]+'">'+allanno[i]["ID"]+'</option>';
                    }
            inpt += '</select>';
            inpt += '<select class="pr-4 col-sm-3" id="allunanno" onchange="loadUnAnnoText()">'+
                    '<option selected disabled>All Un-Annotated</option>';
                    for (i=0; i<allunanno.length; i++) {
                        inpt += '<option value="'+allunanno[i]["textId"]+'">'+allunanno[i]["ID"]+'</option>';
                    }
            inpt += '</select>';
            $('.commentIDs').append(inpt);
            console.log(inpt);
        }
    });
    return false; 
}

function loadUnAnnoText() {
    textId = document.getElementById('allunanno').value;
    $.ajax({
        url: '/loadunannotext',
        type: 'GET',
        data: {'data': JSON.stringify(textId)},
        contentType: "application/json; charset=utf-8", 
        success: function(response){
            window.location.reload();
        }
    });
    return false;
}

function loadAnnoText() {
    textId = document.getElementById('allanno').value;
    $.ajax({
        url: '/loadunannotext',
        type: 'GET',
        data: {'data': JSON.stringify(textId)},
        contentType: "application/json; charset=utf-8", 
        success: function(response){
            window.location.reload();
        }
    });
    return false;
}

function showHideCategory(category) {
    if (category === 'undefined'){
        return false;
    }
    
    for (let [key, value] of Object.entries(document.getElementsByClassName('dependentTag'))) {
            if (value.hidden === false) {
                document.getElementById(value.id).hidden = true;
            }
            if (value.disabled == false) {    
                document.getElementById(value.id).disabled = true;
            }
    }
    for (let [key, value] of Object.entries(document.getElementsByClassName(category))) {
        document.getElementById(value.id).hidden = false;
        document.getElementById(value.id).disabled = false;
        document.getElementById(value.id).nextSibling.hidden = false;
    }    

}

// hide all dependent categories
function hideHideCategory() {
    
    for (let [key, value] of Object.entries(document.getElementsByClassName('dependentTag'))) {
            if (value.hidden === false) {
                document.getElementById(value.id).hidden = true;
            }
            if (value.disabled == false) {    
                document.getElementById(value.id).disabled = true;
            }
    }
}
