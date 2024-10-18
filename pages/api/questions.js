// pages/api/questions.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // Construct the path to your questions.json file
    const filePath = path.join(process.cwd(), 'public', 'questions.json');
    console.log(filePath);
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error reading questions file' });
            return;
        }

        // Parse and return the JSON data
        const questions = JSON.parse(data);
        res.status(200).json(questions);
    });
}
