var baseURL = "http://localhost:3000" // TODO: Figure out a good way to swap dev/prod URLs

function POST(url, payload, callback, errCallback = null) {
    var request = new XMLHttpRequest();
    // request.withCredentials = true;
    request.open("POST", baseURL + url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
    request.send(JSON.stringify(payload));
}

function GET(url, callback, errCallback = null) {
    var request = new XMLHttpRequest();
    // request.withCredentials = true;
    request.open("GET", baseURL + url);
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
    request.send();
}

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