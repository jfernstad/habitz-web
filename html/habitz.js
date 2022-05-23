var baseURL = "http://localhost:3000" // TODO: Figure out a good way to swap dev/prod URLs

//
// Backend requests wiith JWT authentication and JSON payload
//
function GET(url, callback, errCallback = null) {
    var request = _baseRequest("GET", url, callback, errCallback);
    request.send();
}

function POST(url, payload, callback, errCallback = null) {
    var request = _baseRequest("POST", url, callback, errCallback);
    request.send(JSON.stringify(payload));
}

function PATCH(url, payload, callback, errCallback = null) {
    var request = _baseRequest("PATCH", url, callback, errCallback);
    request.send(JSON.stringify(payload));
}

function DELETE(url, payload, callback, errCallback = null) {
    var request = _baseRequest("DELETE", url, callback, errCallback);
    request.send(JSON.stringify(payload));
    // The astute reader has identified that the DELETE verb 
    // should not have a payload. However, the spec does not
    // explicetly forbid it, and the golang package go-chi
    // allows it, therefore so will I. :) 
}

function _baseRequest(method, url, callback, errCallback = null){
    var request = new XMLHttpRequest();
    request.open(method, baseURL + url);
    request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("habitz-token"))

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && this.status <= 299) {
                callback(this.status, this.responseText)
            }
            else if (this.status >= 400 && errCallback != null) {
                errCallback(this.status, this.responseText)
            }
        }
    };
    return request
}

//
// Convenience functions
//
function userFirstname(){
    token = localStorage.getItem("habitz-token")
    claims = parseJwt(token)
    return claims.firstname
}

// From: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};