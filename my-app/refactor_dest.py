import sys

file_path = './src/pages/DestinationTemplate.tsx'

with open(file_path, 'r') as f:
    content = f.read()

start_token = "// ============= INTERNAL COMPONENTS ============="
end_token = "// ============= MAIN TEMPLATE ============="

start_idx = content.find(start_token)
end_idx = content.find(end_token)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx]
    after = content[end_idx:]
    imports = 'import { BookingForm } from "../components/BookingForm";\nimport { Card, ImgCard, PlaceCard, Section } from "../components/DestinationUI";\n\n'
    new_content = before + imports + after
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Success")
else:
    print("Tokens not found")
