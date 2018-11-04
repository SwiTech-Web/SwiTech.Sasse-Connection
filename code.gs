function doGet(e){
    if(e.parameter.redirect != undefined){
        PropertiesService.getUserProperties().setProperty("redirect", decodeURIComponent(e.parameter.redirect));
        return HtmlService.createTemplateFromFile("login2")
        .evaluate()
        .setTitle("SwiTech Sasse Redirection");
    } else {
        return HtmlService.createTemplateFromFile("login")
        .evaluate()
        .setTitle("SwiTech Sasse Connection");
    }
}

function checkUser(username, pwd, page){
    if(PropertiesService.getScriptProperties().getProperty(username) == Utilities.base64Encode(pwd)){
        if(page == undefined){
            page = getUserRedirection();
        } else if(page == "SPG") {
            page = "https://script.google.com/macros/s/AKfycbwFnI_L9kJWUVKUFPdP_zne0hCBRrkImCGtYuTycfdBquMNquw/exec";
        }
        var response = JSON.parse(UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbxuepLyMQTWt_HvAy_fBKUhqcSc0yDQFCGIdUQNzMu5YgjgdfU/exec?action=refresh&email=" + Session.getActiveUser().getEmail()).getContentText());
        return [true, page, response.data.token];
    } else {
        return [false, null, null];
    }
}

function getUserRedirection(){
    return PropertiesService.getUserProperties().getProperty("redirect");
}
