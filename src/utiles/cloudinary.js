


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dkfb92oyg', 
    api_key: '939273298499912', 
    api_secret: 'GVw1v6WxLnuGyAn5kG2Vum5Q5oU' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded successfully:", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        fs.unlinkSync(localFilePath); // Delete local file if upload fails
        return null;
    }
};

export { uploadOnCloudinary };


