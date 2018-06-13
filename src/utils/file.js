// @flow

const IMAGE_MIMES = [
  'image/png',
  'image/jpeg',
  'image/jpg'
];

export function getFileFormat(mimeString: string) {
  if (mimeString.toLowerCase().indexOf('jpg') > -1) {
    return 'jpg';
  }
  if (mimeString.toLowerCase().indexOf('jpeg') > -1) {
    return 'jpeg';
  }
  if (mimeString.toLowerCase().indexOf('png') > -1) {
    return 'png';
  }
  if (mimeString.toLowerCase().indexOf('mp4') > -1) {
    return 'mp4';
  }
}

export function isImage(mimeString: string) {
  return IMAGE_MIMES.indexOf(mimeString) > -1;
}

