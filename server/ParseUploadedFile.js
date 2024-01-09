
const pdf = require("pdf-parse");
const ReadText = require("text-from-image");
const docxParser = require("docx-parser");

const ParseUploadedFile = async (req) => {
    const typeFile = req.files.file.mimetype;
    console.log("typeFile",typeFile)
    const buffer = req.files.file.data;
  const acceptedPdfTypes = ["application/pdf"];
  const acceptedDocTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/rtf",
    "application/vnd.oasis.opendocument.text",
    "text/plain",
  ];
  const acceptedImageTypes = ["image/png", "image/jpeg"];

  if (acceptedPdfTypes.includes(typeFile)) {
    const pdfData=await pdf(buffer)
    return(pdfData.text)
 } 
   
  else if (acceptedDocTypes.includes(typeFile)) {
      const docData=await docxParser.parseDocx(buffer)
      return(docData.text)
    }
  
  else if (acceptedImageTypes.includes(typeFile)) {
    const imgData=await ReadText(buffer)
    return(imgData.text)
  }

};
module.exports = ParseUploadedFile;
