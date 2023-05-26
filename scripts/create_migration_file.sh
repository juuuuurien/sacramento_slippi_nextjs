#!/bin/bash

currentDate=$(date +%Y-%m-%d)
currentTimestamp=$(date +%s)
migrationLabel=$1 # from the first arg.

#filename
filename="${currentDate}_${currentTimestamp}_${migrationLabel}.ts"

filepath="./prisma/migrations/${filename}"

boilerplate="import { PrismaClient } from '@prisma/client';

export async function main(prisma: PrismaClient) {
  // Migration code here
}"

echo "$boilerplate" > "$filepath"

echo "New migration file created at: $filepath"

