import { useState } from "react";

export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function generateQr() {
    setLoading(true);
    try {
      const Url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(Url);
    } catch (error) {
      console.error("Error in QR Generator", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error) => {
        console.error("Error in Downloading QR Code", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <div className="spinner"></div>}
      {img && <img src={img} className="qr-code-image" alt="Generated QR Code" />}
      <div className="input-section">
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code:
        </label>
        <input 
          type="text" 
          id="dataInput" 
          placeholder="Enter data to generate QR code" 
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
        />
        
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150):
        </label>
        <input 
          type="text" 
          id="sizeInput" 
          value={qrSize}
          placeholder="Enter image size (e.g., 150)"
          onChange={(e) => setQrSize(e.target.value)}
        />
        <div className="button-group">
          <button className="generate-button" disabled={loading} onClick={generateQr}>
            Generate QR Code
          </button>
          <button className="download-button" onClick={downloadQr}>
            Download QR Code
          </button>
        </div>
      </div>
      <p className="footer">Designed by <a href="https://gobalakrishnan.vercel.app/">Gobala Krishnan</a></p>
    </div>
  );
}
