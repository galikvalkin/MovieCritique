/**
 * @flow
 */
/** @module Storage */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Storage {
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * post
   * @param  {object} image: {type: string, path: string, fileName: string}
   * @return {Promise}
   */
  post(image: {type: string, path: string, fileName: string}, filePath: string) {
    const { type, path, fileName } = image;
    return new Promise((resolve, reject) => {
      let rnfbURI = RNFetchBlob.wrap(path);

      Blob
      .build(rnfbURI, { type: type })
      .then((blob) => {
        this.connection
        .ref(filePath)
        .child(fileName)
        .put(blob, { contentType: type })
        .then((snapshot) => {
          this.connection.ref(`${filePath}${fileName}`)
          .getDownloadURL().then((url) => {
            resolve(url);
          });
        });
      })
      .catch((error) => {
        console.warn('Storage - post error: ', error);
        reject(error);
      });
    });
  }
}
