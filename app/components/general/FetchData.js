import React from 'react';

var FetchData = {

  async _generateAuthorization(URL_AUTHORIZATION, URL_DATA) {
    return await fetch(URL_AUTHORIZATION, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        this._fetchData(URL_DATA, responseJson).done();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  async _fetchData(url, dataResponse) {
      return fetch(url, {
        method: 'GET',
        headers: {
          'DateTime': dataResponse.DateTime,
          'RequestToken': dataResponse.RequestToken,
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => {
        console.error(error);
    });
  }

}

export default FetchData;
