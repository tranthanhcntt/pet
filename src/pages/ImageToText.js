import { useState } from "react";
import Tesseract from "tesseract.js";

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleExtractText = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const { data: { text } } = await Tesseract.recognize(image, "eng");
      setText(text);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
      {image && <img src={image} alt="Uploaded" className="w-full h-auto mb-2" />}
      <button onClick={handleExtractText} className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? "Processing..." : "Extract Text"}
      </button>
      {text && <div className="mt-4 p-2 bg-gray-100 rounded">{text}</div>}
    </div>
  );
};

export default ImageToText;
