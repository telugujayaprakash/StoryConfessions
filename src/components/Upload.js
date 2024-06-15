// App.js
import React, { useState } from "react";
import { firestore, storage } from "./firebase";

function Upload() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async () => {
    if (imageFile) {
      // Upload image file to Cloud Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(imageFile.name);
      await fileRef.put(imageFile);

      // Get image URL
      const url = await fileRef.getDownloadURL();

      // Update Firestore document with image URL
      await firestore.collection("categories").doc("hrror").update({
        imageUrl: url
      });

      // Set image URL in state
      setImageUrl(url);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}

export default Upload;
