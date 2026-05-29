import Datastore from "nedb-promises";
const db = new Datastore({ filename: "./data/users.db", autoload: true });

export default db;
