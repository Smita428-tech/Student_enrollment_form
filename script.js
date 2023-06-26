var token = '90933230|-31949280281796281|90950773';
var dbname = 'SCHOOL-DB';
var relation = "STUDENT-TABLE";
var baseUrl = "http://api.login2explore.com:5577";
function resetForm() {
    $("#roll").val('')
    $("#name").val('');
    $("#cls").val('');
    $("#dob").val('');
    $("#addr").val('');
    $("#doe").val('');
}

function disableAll() {
    resetForm();
    $("#roll").prop("disabled", false);
    $("#roll").focus();
    $("#name").prop("disabled", true);
    $("#cls").prop("disabled", true);
    $("#dob").prop("disabled", true);
    $("#addr").prop("disabled", true);
    $("#doe").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
}
disableAll();
function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
            + "\n"
            + "}";
    return value1;
}

function findRoll(ele) {
    var roll = ele.value;
    var obj = {
        Roll_No: roll
    };
    var jsnobj = JSON.stringify(obj);
    var request = createGET_BY_KEYRequest(token, dbname, relation, jsnobj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(request, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status == 400) {
        $("#name").prop("disabled", false);
        $("#name").focus();
        $("#cls").prop("disabled", false);
        $("#dob").prop("disabled", false);
        $("#addr").prop("disabled", false);
        $("#doe").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else {
        $("#name").prop("disabled", false);
        $("#roll").prop("disabled", true);
        $("#cls").prop("disabled", false);
        $("#dob").prop("disabled", false);
        $("#addr").prop("disabled", false);
        $("#doe").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        // console.log(res);
        var data = JSON.parse(res.data).record;
        // console.log(data);
        $("#name").val(data.Full_Name);
        $("#cls").val(data.Class);
        $("#dob").val(data.Birth_Date);
        $("#addr").val(data.Address);
        $("#doe").val(data.Enrollment_Date);
    }
}
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
function saveData() {
    $("#ajax").html("wait");
    var roll = $("#roll").val();
    var name = $("#name").val()
    var cls = $("#cls").val();
    var dob = $("#dob").val();
    var addr = $("#addr").val();
    var doe = $("#doe").val();
    if(roll==''){
        $("#roll").focus();
        return;
    }
    if(name==''){
        $("#name").focus();
        return;
    }if(cls==''){
        $("#cls").focus();
        return;
    }if(dob==''){
        $("#dob").focus();
        return;
    }if(addr==''){
        $("#addr").focus();
        return;
    }if(doe==''){
        $("#doe").focus();
        return;
    }
    var obj = {
        Roll_No: roll,
        Full_Name: name,
        Class: cls,
        Birth_Date: dob,
        Address: addr,
        Enrollment_Date: doe
    };
    var jsonobj = JSON.stringify(obj);
    var req = createPUTRequest(token, jsonobj, dbname, relation);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}
function createSETRequest(token, jsonStr, dbName, relName, type, primaryKey, uniqueKeys, foreignKeys) {
    if (type === undefined) {
        type = "DEFAULT";
    }
    var req = {
        token: token,
        cmd: "SET",
        dbName: dbName,
        rel: relName,
        type: type,
        jsonStr: JSON.parse(jsonStr)
    };
    if (primaryKey !== undefined) {
        req.primaryKey = primaryKey;
    }
    if (uniqueKeys !== undefined) {
        req.uniqueKeys = uniqueKeys;
    }
    if (foreignKeys !== undefined) {
        req.foreignKeys = foreignKeys;
    }
    req = JSON.stringify(req);
    return req;
}

function updateData(){
    var roll = $("#roll").val();
    var name = $("#name").val()
    var cls = $("#cls").val();
    var dob = $("#dob").val();
    var addr = $("#addr").val();
    var doe = $("#doe").val();
    if(name==''){
        $("#name").focus();
        return;
    }if(cls==''){
        $("#cls").focus();
        return;
    }if(dob==''){
        $("#dob").focus();
        return;
    }if(addr==''){
        $("#addr").focus();
        return;
    }if(doe==''){
        $("#doe").focus();
        return;
    }
    var obj = {
        Roll_No: roll,
        Full_Name: name,
        Class: cls,
        Birth_Date: dob,
        Address: addr,
        Enrollment_Date: doe
    };
    var jsonobj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonobj,dbname,relation,'UPDATE','Roll_No');
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}