
let forge = null;

import("../../static/forge.min.js").then(({ default: _forge }) => {
  forge = _forge;
  console.log('forge', forge);
});

// Naive implementation that fetches the private key over the network.
// Do not use it for a production deployment.
export async function generatePKCS7({ fileContents }) {
    const certificatePromise = fetch(
      "../../static/certificate.pem"
    ).then((response) => response.text());
    const privateKeyPromise = fetch(
      "../../static/private-key.pem"
    ).then((response) => response.text());
    const [certificatePem, privateKeyPem] = await Promise.all([
      certificatePromise,
      privateKeyPromise,
    ]);
    const certificate = forge.pki.certificateFromPem(certificatePem);
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  
    const p7 = forge.pkcs7.createSignedData();
  
    p7.content = new forge.util.ByteBuffer(fileContents);
    p7.addCertificate(certificate);
    p7.addSigner({
      key: privateKey,
      certificate: certificate,
      digestAlgorithm: forge.pki.oids.sha256,
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data,
        },
        {
          type: forge.pki.oids.messageDigest,
        },
        {
          type: forge.pki.oids.signingTime,
          value: new Date(),
        },
      ],
    });
  
    p7.sign({ detached: true });
  
    return stringToArrayBuffer(forge.asn1.toDer(p7.toAsn1()).getBytes());
  }
  
  // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  export function stringToArrayBuffer(binaryString) {
    const buffer = new ArrayBuffer(binaryString.length);
    let bufferView = new Uint8Array(buffer);
  
    for (let i = 0, len = binaryString.length; i < len; i++) {
      bufferView[i] = binaryString.charCodeAt(i);
    }
  
    return buffer;
  }