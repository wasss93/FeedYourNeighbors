#!/bin/bash

# Check if the repository URL is provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [new_repository_url]"
    exit 1
fi

# Get the URL of the new repository from the script's arguments
new_repo_url=$1

# Get the name of the default remote (typically 'origin')
default_remote=$(git remote)

# Get the current fetch URL for the default remote
current_fetch_url=$(git remote get-url "$default_remote")

# Set the current fetch URL as the push URL
git remote set-url --push "$default_remote" "$current_fetch_url"

# Add the new repository URL as an additional push URL
git remote set-url --add --push "$default_remote" "$new_repo_url"

echo "Added $new_repo_url as an additional push URL to the remote: $default_remote"
