/* eslint-disable */
/**
 * @copyright The code was taken from the portal http://www.webtoolkit.info/javascript-base64.html
 */

export namespace Base64Encoder {
  const base64Sequence = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const utf8Encode = (value: string) => {
    value = value.replace(/\r\n/g, '\n');

    let utftext = '';

    for (let n = 0; n < value.length; n++) {
      const c = value.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);

        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);

        utftext += String.fromCharCode(((c >> 6) & 63) | 128);

        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  };

  export const encode = (input: string) => {
    let output = '';
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    input = utf8Encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output += `${base64Sequence.charAt(enc1)}${base64Sequence.charAt(enc2)}${base64Sequence.charAt(enc3)}${base64Sequence.charAt(enc4)}`;
    }

    return output;
  };
}
