const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('csv-parser');

const serviceAccount = require('path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com',
});

const db = admin.firestore();

const csvFilePath = 'path/to/your/csvfile.csv';

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Add logic here to format and write data to Firestore
    db.collection('your_collection').add(row)
      .then((docRef) => {
        console.log('Document written with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });
