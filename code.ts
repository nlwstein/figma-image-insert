figma.showUI(__html__, { visible: false });
figma.ui.postMessage({ type: 'networkRequest' });
import { Base64 } from 'js-base64';
figma.ui.onmessage = async (msg) => {
  try {

    // Base64 decode back to UInt8Array: 
    function base64ToArray(base64) {
      var raw = Base64.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    };
    var array = base64ToArray(msg);
    // End Base64

    var image = figma.createImage(array)
    var _paint: Paint = {
      type: "IMAGE",
      imageHash: image.hash,
      scaleMode: "FILL"
    };
    var rect = figma.createRectangle();
    rect.resize(1920, 1080);
    rect.fills = [
      _paint
    ];
    figma.closePlugin();
  } catch (e) {
    console.log(e);
    figma.closePlugin();
  }
}