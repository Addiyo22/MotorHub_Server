const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Setup Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'car-project', // Name of the folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'webp'], // Allowed formats
  },
});

// Create an instance of multer with the Cloudinary storage
const fileUploader = multer({ storage });

// Export the fileUploader instance
module.exports = { fileUploader };