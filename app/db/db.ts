import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";

// Enable promise for SQLite
enablePromise(true);

const connectToDatabase = async () => {
  return openDatabase(
    { name: "yourProjectName.db", location: "default" },
    () => {},
    (error) => {
      console.error(error);
      throw Error("Could not connect to database");
    }
  );
};

const createTables = async (db: SQLiteDatabase) => {
  const contactsQuery = `
   CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      name TEXT,
      phoneNumber TEXT
   )
  `;
  try {
    await db.executeSql(contactsQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};

export default { connectToDatabase, createTables };
