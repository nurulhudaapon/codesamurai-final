#!/bin/bash
cat << "EOF"
EcoSync DB Type Generator
EOF
                                   
# Set DB  URI from argument
DB_URI=$1

# Set to default docker db if not provided
if [[ -z "$DB_URI" ]]; then
    DB_URI="postgres://postgres:db_password@127.0.0.1:5432/ecosync"
fi

echo "Generating types..."
npx -y supabase gen types typescript --db-url "$DB_URI" > types/types.ts
# npx prettier --write types/types.ts
echo "Done!"