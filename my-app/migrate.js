import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
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
  let changed = false;

  // React Router DOM to Next.js conversions
  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
      let nextLinkImports = [];
      let nextNavigationImports = [];
      let nextImports = [];
      
      const items = imports.split(',').map(s => s.trim());
      items.forEach(item => {
        if (item === 'Link') nextLinkImports.push('Link');
        else if (item === 'useNavigate') nextNavigationImports.push('useRouter as useNavigate'); // Easy alias
        else if (item === 'useLocation') nextNavigationImports.push('usePathname as useLocation'); // Partial compat
        else if (item === 'useParams') nextNavigationImports.push('useParams');
        else if (item === 'BrowserRouter' || item === 'Routes' || item === 'Route') {} // Drop these
        else nextImports.push(item);
      });

      let res = '';
      if (nextLinkImports.length > 0) res += `import Link from 'next/link';\n`;
      if (nextNavigationImports.length > 0) res += `import { ${nextNavigationImports.join(', ')} } from 'next/navigation';\n`;
      
      return res;
    });
    
    // add 'use client' if hooks are used
    if (content.includes('useNavigate(') || content.includes('useLocation(') || content.includes('useParams(') || content.includes('useState(') || content.includes('useEffect(')) {
      if (!content.startsWith('"use client"')) {
         content = '"use client";\n' + content;
      }
    }
    
    changed = true;
  }

  // Also catch files that just use useState/useEffect but don't have react-router-dom
  if (!content.startsWith('"use client"') && (content.includes('useState(') || content.includes('useEffect(') || content.includes('useContext(') || content.includes('useAuth(') || content.includes('useRef('))) {
      content = '"use client";\n' + content;
      changed = true;
  }

  // Replace <Link to="..."> with <Link href="...">
  if (content.includes('<Link')) {
    content = content.replace(/<Link([^>]*)\sto=({.*?})/g, '<Link$1 href=$2');
    content = content.replace(/<Link([^>]*)\sto=(["'].*?["'])/g, '<Link$1 href=$2');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Migration script complete.');
