const fs = require("fs");
const path = require("path");

// Get the current date
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

// Get the migration name from the command-line argument
const migrationName = process.argv[2];

// Generate the file name using the current date and migration name
const fileName = `${formattedDate}_${Date.now()}_${migrationName}.ts`;

// Specify the path for the new migration file
const filePath = path.join(__dirname, "..", "migrations", fileName);

// Specify the boilerplate code
const boilerplateCode = `import { PrismaClient } from '@prisma/client';
export async function main(prisma) {
  // Migration code here
}`;

// Create the migration file with the boilerplate code
fs.writeFileSync(filePath, boilerplateCode);

console.log(`New migration file created at: ${filePath}`);
