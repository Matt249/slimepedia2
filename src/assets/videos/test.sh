#!/bin/bash

# Définir le répertoire cible
dir=$(pwd)

# Obtenir la liste des fichiers .webm dans le répertoire cible
files=("$dir"/*.webm)

# Créer un tableau vide pour stocker les ratios, les noms de fichiers, les tailles originales et les tailles light
data=()

# Parcourir chaque fichier .webm
for file in "${files[@]}"; do
  # Extraire le nom du fichier sans l'extension .webm
  filename="${file%.*}"

  # Rechercher le fichier .light.webm correspondant
  light_file="$filename.light.webm"

  # Vérifier si le fichier .light.webm existe
  if [ -f "$light_file" ]; then
    # Obtenir la taille des deux fichiers
    original_size=$(stat -c %s "$file")
    light_size=$(stat -c %s "$light_file")

    # Calculer le ratio entre les tailles
    ratio=$(echo "scale=2; $original_size / $light_size" | bc)

    # Stocker le ratio, le nom du fichier, les tailles originales et light dans le tableau
    data+=("$ratio:$filename:$original_size:$light_size")
  fi
done

# Trier le tableau data par ordre croissant de ratios
sorted_data=($(sort <<< "${data[*]}"))

# Afficher les fichiers triés par ordre croissant de ratio de compression
for data_entry in "${sorted_data[@]}"; do
  ratio=$(echo "$data_entry" | cut -d ':' -f 1)
  filename=$(echo "$data_entry" | cut -d ':' -f 2)
  original_size=$(echo "$data_entry" | cut -d ':' -f 3)
  light_size=$(echo "$data_entry" | cut -d ':' -f 4)
  echo "$filename: $original_size bytes / $light_size bytes ($ratio)"
done
