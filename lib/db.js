import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  const db = await open({
    filename: './hospitaldata.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS patient (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      diagnosis TEXT
    )
  `);

  return db;
}

export async function getPatients() {
  const db = await openDb();
  const patients = await db.all('SELECT * FROM patient');
  await db.close();
  return patients;
}

export async function getPatientById(id) {
  const db = await openDb();
  const patient = await db.get('SELECT * FROM patient WHERE id = ?', id);
  await db.close();
  return patient;
}

export async function createPatient({ name, age, diagnosis }) {
  const db = await openDb();
  const result = await db.run('INSERT INTO patient (name, age, diagnosis) VALUES (?, ?, ?)', [name, age, diagnosis]);
  await db.close();
  return result.lastID;
}

export async function updatePatient(id, { name, age, diagnosis }) {
  const db = await openDb();
  const result = await db.run('UPDATE patient SET name = ?, age = ?, diagnosis = ? WHERE id = ?', [name, age, diagnosis, id]);
  await db.close();
  return result.changes;
}

export async function deletePatient(id) {
  const db = await openDb();
  const result = await db.run('DELETE FROM patient WHERE id = ?', id);
  await db.close();
  return result.changes;
}
