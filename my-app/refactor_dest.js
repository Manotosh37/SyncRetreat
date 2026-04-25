import fs from 'fs';

const filePath = './src/pages/DestinationTemplate.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The lines we want to remove are between "// ============= INTERNAL COMPONENTS ============="
// and "// ============= MAIN TEMPLATE ============="

const startToken = "// ============= INTERNAL COMPONENTS =============";
const endToken = "// ============= MAIN TEMPLATE =============";

const startIndex = content.indexOf(startToken);
const endIndex = content.indexOf(endToken);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    // Add imports
    const imports = `import { BookingForm } from "../components/BookingForm";\nimport { Card, ImgCard, PlaceCard, Section } from "../components/DestinationUI";\n\n`;
    
    const newContent = before + imports + after;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully removed internal components and added imports!");
} else {
    console.log("Tokens not found.");
}
