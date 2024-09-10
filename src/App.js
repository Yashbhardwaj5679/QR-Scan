import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import './App.css';  // Import CSS styles

const App = () => {
  const [qrText, setQrText] = useState("");
  const [qrSize, setQrSize] = useState(256);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current === null) {
      return;
    }
    
    toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      
      {/* Input Field for QR Code Text */}
      <input
        type="text"
        value={qrText}
        onChange={(e) => setQrText(e.target.value)}
        placeholder="Enter text or URL"
      />
      
      <div style={{ margin: "20px 0" }}>
        {/* QR Code Size Slider */}
        <label>
          QR Code Size: {qrSize}px
          <input
            type="range"
            min="128"
            max="512"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
          />
        </label>
      </div>
      
      {/* Color Customization */}
      <div style={{ margin: "20px 0" }}>
        <label>
          Foreground Color:
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </label>
        
        <label style={{ marginLeft: "20px" }}>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>
      
      {/* Live Preview of QR Code */}
      <div ref={qrCodeRef} className="qr-preview">
        <QRCodeCanvas
          value={qrText}
          size={qrSize}
          bgColor={bgColor}
          fgColor={fgColor}
        />
      </div>
      
      {/* Download Button */}
      <button onClick={downloadQRCode}>
        Download QR Code
      </button>
      
      <div className="footer">
        <p>With over 450,000 QR Codes generated, it's everything you need to create and download QR codes.</p>
      </div>
    </div>
  );
};

export default App;

