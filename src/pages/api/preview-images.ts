import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { project } = req.query;

  if (!project) {
    return res.status(400).json({ error: 'Project parameter is required' });
  }

  try {
    // Get the absolute path to the public directory
    const publicDir = path.join(process.cwd(), 'public');
    const previewDir = path.join(publicDir, 'previews', project as string);
    
    // Check if directory exists
    if (!fs.existsSync(previewDir)) {
      console.log('Preview directory not found:', previewDir);
      return res.status(404).json({ error: 'Preview directory not found' });
    }

    // Read all files from the directory
    const files = fs.readdirSync(previewDir);
    
    // Filter for image files and sort them
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort((a, b) => {
        // Extract timestamp from filename
        const timestampA = a.match(/\d{8}\s\d{6}/)?.[0] || '';
        const timestampB = b.match(/\d{8}\s\d{6}/)?.[0] || '';
        return timestampB.localeCompare(timestampA);
      });

    res.status(200).json({ files: imageFiles });
  } catch (error) {
    console.error('Error reading preview directory:', error);
    res.status(500).json({ error: 'Failed to load preview files' });
  }
} 