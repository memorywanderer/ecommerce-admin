import formidable from "formidable"
import path from 'path'
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  }
}

const readFile = (req, saveLocally) => {
  const options = {
    uploadDir: saveLocally ? path.join(process.cwd(), "/public/images") : undefined,
    keepExtensions: true,
    maxFileSize: 4000 * 1024 * 1024, // Maximum file size of 4000MB
    multiples: true
  };
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename;
  };
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log({ files })
      console.log({ fields })
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }

  const { files } = await readFile(req, true)
  const someFiles = Object.values(files).map(file => file)
  let fileNames = {}
  if (Array.isArray(someFiles[0])) {
    fileNames = someFiles[0].map(file => file.newFilename)
  } else {
    fileNames = someFiles.map(file => file.newFilename)
  }
  res.json({ fileNames })
}