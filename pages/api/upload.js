import { fileTypeFromFile } from 'file-type';
import formidable from 'formidable';

import cloudinary from 'lib/cloudinary';
import withAuth from 'lib/middlewares/withAuth';

const imageExts = ['jpg', 'png', 'gif', 'webp', 'bmp'];

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm();

  return form.parse(req, async (err, fields, files) => {
    const length = Object.keys(files).length;

    if (length === 0) {
      return res.status(204).end();
    } else if (length > 1) {
      return res.status(400).json({ error: 'Only single file upload is supported' });
    } else {
      const file = files[Object.keys(files)[0]];
      const type = await fileTypeFromFile(file.filepath);

      // If file type is not supported
      if (!imageExts.includes(type.ext)) {
        return res.status(400).json({ error: 'File type is not supported' });
      }

      cloudinary.uploader.upload(file.filepath, (err, result) => {
        if (err) return res.status(400).json({ error: 'Upload failed' });
        return res.status(201).json(result);
      });
    }
  });
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default withAuth(handler);
