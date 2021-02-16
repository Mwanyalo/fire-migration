const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");
var dataF = require("./alan.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("Began migrating...");
const entityKeys = Object.keys(dataF);

entityKeys.forEach((key, i) => {
  let entityNames = dataF[key];
  for (entityName in entityNames) {
    const dict = entityNames[entityName];
    db.collection(key)
      .doc(entityName)
      .set(dict)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }

  if (i + 1 == entityKeys.length) {
    console.log("Finished migrating.");
  }
});
