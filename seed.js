import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const problemsPath = path.join(__dirname, 'src', 'data', 'problems.json');
const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));

async function seed() {
    try {
        const response = await fetch('http://localhost:5160/api/problems/seed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problems),
        });

        if (response.ok) {
            console.log('Database seeded successfully!');
        } else {
            console.error('Failed to seed database:', await response.text());
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seed();
