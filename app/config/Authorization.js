import CryptoJS from "crypto-js";

class Authorization {
  generate(method, accessToken) {
    const key = '0tt@pi.C0m_Med1@';
    let requestMethod = method ? method : 'GET';
    let dateNow = new Date();
    let date = dateNow.getUTCFullYear() + "-" +
              ("0" + (dateNow.getUTCMonth()+1)).slice(-2) +"-"+
              ("0" + dateNow.getUTCDate()).slice(-2) + " " +
              ("0" + dateNow.getUTCHours()).slice(-2) + ":" +
              ("0" + dateNow.getUTCMinutes()).slice(-2) + ":" +
              ("0" + dateNow.getUTCSeconds()).slice(-2) + "." +
              (dateNow.getUTCMilliseconds());
    let value = date + "\n" + requestMethod + "\n" + 78;
    let hash = CryptoJS.HmacSHA256(value, key);

    let token = hash.toString(CryptoJS.enc.Base64);
    let authorizationBase = '';

    if(accessToken) {
      let authorizationCrypt = CryptoJS.HmacSHA256(value, accessToken);
      authorizationBase = authorizationCrypt.toString(CryptoJS.enc.Base64)
    }

    let authorization = {
      'DateTime': date,
      'RequestToken': token,
      'Authorization': authorizationBase
    }

    return JSON.stringify(authorization);
  }
}

export default new Authorization();
