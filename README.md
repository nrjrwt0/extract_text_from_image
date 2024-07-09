# OCR App

This project is an OCR (Optical Character Recognition) application that allows users to upload images, extract text from the images, and display the extracted text. The application also supports user authentication and authorization, providing a personalized experience for each user.

For a video demonstration of the application, please check and download the [video](https://github.com/nrjrwt0/extract_text_from_image/blob/main/ocr_app.mp4).

## Features

- **Image Upload**: Upload images from the frontend.
- **Text Extraction**: Extract text from uploaded images using Tesseract.js.
- **User Authentication**: Sign up, log in, and manage user sessions.
- **Pagination**: View paginated OCR results.
- **Modal Display**: Click on images to view extracted text in a modal.
- **User-specific Data**: Each user can only view their own OCR results.

## Technologies Used

- **Frontend**: React, React Router DOM
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **OCR**: Tesseract.js

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/nrjrwt0/extract_text_from_image.git
    cd extract_text_from_image
    ```

2. Install dependencies of client and server:

    ```bash
    npm install
    ```

### Running the Application

To start both the client and server, run:

```bash
npm start
