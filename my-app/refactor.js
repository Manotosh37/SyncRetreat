import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix imports in App.tsx specifically
    if (file.endsWith('App.tsx')) {
        content = content.replace(/\.\/assets\/Pages\//g, './pages/');
        content = content.replace(/\.\/assets\/(Hero|Infra|Calendar|Navbar|Footer)/g, './components/$1');
    } else {
        // Fix imports in other files
        // E.g., from a file in src/pages/ (was src/assets/Pages)
        // Importing Navbar: was `../Navbar`, now is `../components/Navbar`
        content = content.replace(/from "\.\.\/Navbar"/g, 'from "../components/Navbar"');
        content = content.replace(/from "\.\.\/Footer"/g, 'from "../components/Footer"');
        content = content.replace(/from "\.\.\/Hero"/g, 'from "../components/Hero"');
        content = content.replace(/from "\.\.\/Infra"/g, 'from "../components/Infra"');
        content = content.replace(/from "\.\.\/Calendar"/g, 'from "../components/Calendar"');
        
        // Also check single quotes
        content = content.replace(/from '\.\.\/Navbar'/g, "from '../components/Navbar'");
        content = content.replace(/from '\.\.\/Footer'/g, "from '../components/Footer'");
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated imports in ${file}`);
    }
});
