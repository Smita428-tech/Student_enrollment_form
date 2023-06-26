var token = '90933230|-31949280281796281|90950773';
var dbname = 'EMP-DB';
var relation = "EmpData";
var baseUrl = "http://api.login2explore.com:5577";
function resetForm() {
    $("#id").val('')
    $("#name").val('');
    $("#salary").val('');
    $("#hra").val('');
    $("#da").val('');
    $("#deduct").val('');
}

function disableAll() {
    resetForm();
    $("#id").prop("disabled", false);
    $("#id").focus();
    $("#name").prop("disabled", true);
    $("#salary").prop("disabled", true);
    $("#hra").prop("disabled", true);
    $("#da").prop("disabled", true);
    $("#deduct").prop("disabled", true);
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

function findId(ele) {
    var id = ele.value;
    var obj = {
        id: id
    };
    var jsnobj = JSON.stringify(obj);
    var request = createGET_BY_KEYRequest(token, dbname, relation, jsnobj);
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(request, "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (res.status == 400) {
        $("#name").prop("disabled", false);
        $("#name").focus();
        $("#salary").prop("disabled", false);
        $("#hra").prop("disabled", false);
        $("#da").prop("disabled", false);
        $("#deduct").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else {
        $("#name").prop("disabled", false);
        $("#id").prop("disabled", true);
        $("#salary").prop("disabled", false);
        $("#hra").prop("disabled", false);
        $("#da").prop("disabled", false);
        $("#deduct").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        // console.log(res);
        var data = JSON.parse(res.data).record;
        // console.log(data);
        $("#name").val(data.Full_Name);
        $("#salary").val(data.salary);
        $("#hra").val(data.hra);
        $("#da").val(data.da);
        $("#deduct").val(data.deduct);
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
    var id = $("#id").val();
    var name = $("#name").val()
    var salary = $("#salry").val();
    var hra = $("#hra").val();
    var da = $("#da").val();
    var deduct = $("#deduct").val();
    if(id==''){
        $("#id").focus();
        return;
    }
    if(name==''){
        $("#name").focus();
        return;
    }if(salary==''){
        $("#cls").focus();
        return;
    }if(hra==''){
        $("#dob").focus();
        return;
    }if(da==''){
        $("#addr").focus();
        return;
    }if(deduct==''){
        $("#doe").focus();
        return;
    }
    var obj = {
        id: id,
        Full_Name: name,
        Salary: salary,
        hra: hra,
        Da: da,
        Deduct: deduct
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
    var id = $("#id").val();
    var name = $("#name").val()
    var salary = $("#salary").val();
    var hra = $("#hra").val();
    var da = $("#da").val();
    var deduct = $("#deduct").val();
    if(name==''){
        $("#name").focus();
        return;
    }if(salary==''){
        $("#cls").focus();
        return;
    }if(hra==''){
        $("#dob").focus();
        return;
    }if(da==''){
        $("#addr").focus();
        return;
    }if(deduct==''){
        $("#doe").focus();
        return;
    }
    var obj = {
        id: id,
        Full_Name: name,
        Salary: salary,
        hra: hra,
        Da: da,
        deduct: deduct
    };
    var jsonobj = JSON.stringify(obj);
    var req=createSETRequest(token,jsonobj,dbname,relation,'UPDATE','Roll_No');
    jQuery.ajaxSetup({ async: false });
    var res = executeCommand(req, "/api/iml/set");
    jQuery.ajaxSetup({ async: true });
    disableAll();
}