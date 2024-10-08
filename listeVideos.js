const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'src/assets/videos');
const outputFilePath = path.join(__dirname, 'src', 'videosList.js');

fs.readdir(videosDir, (err, files) => {
	if (err) {
		console.error('Erreur lors de la lecture du répertoire des vidéos', err);
		return;
	}

	const videoFiles = files.filter(file => file.endsWith('.webm')).map(file => `./assets/videos/${file}`);
	const content = `export const videosList = ${JSON.stringify(videoFiles)};`;

	fs.writeFile(outputFilePath, content, err => {
		if (err) {
			console.error('Erreur lors de l\'écriture du fichier de liste des vidéos', err);
		} else {
			console.log('Liste des vidéos générée avec succès');
		}
	});
});