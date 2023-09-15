const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Wählen Sie einen geeigneten Port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API-Endpunkt zum Empfangen der Datei und Ausführen der Bearbeitung
app.post('/split-mp3', async (req, res) => {
  try {
    const { inputPath, outputPath, fileName, numSegments } = req.body;

    // Führen Sie hier die MP3-Aufteilung durch
    await cutMp3(inputPath, outputPath, fileName, numSegments);

    // Erstellen Sie eine Liste der Dateinamen der gesplitteten Dateien
    const splitFiles = [];
    for (let i = 1; i <= numSegments; i++) {
      splitFiles.push(`${fileName}_${i < 10 ? '0' : ''}${i}.mp3`);
    }

    // Geben Sie die Liste der gesplitteten Dateien als Antwort zurück
    res.json({ success: true, splitFiles });
  } catch (error) {
    console.error('Fehler bei der Bearbeitung:', error);
    res.status(500).json({ success: false, error: 'Bearbeitung fehlgeschlagen' });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
