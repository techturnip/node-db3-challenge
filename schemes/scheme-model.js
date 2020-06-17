// DATABASE HELPER METHODS
// --------------------------------------------|
const db = require('../data/db-config.js')
// --------------------------------------------|
const find = () => db('schemes')
// --------------------------------------------|
const findById = id =>
  db('schemes')
    .where({ id })
    .first()
// --------------------------------------------|
const findSteps = id =>
  db('steps as st')
    .join('schemes as sc', 'sc.id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.step_number', 'st.instructions')
    .where({ scheme_id: id })
    .orderBy('st.step_number')
// --------------------------------------------|
const add = scheme =>
  db('schemes')
    .insert(scheme)
    .then(ids => findById(ids[0]))
// --------------------------------------------|
const update = (changes, id) => {
  db('schemes')
    .where({ id })
    .update(changes)
    .then(() => findById(id))
}
// --------------------------------------------|
const remove = id =>
  db('schemes')
    .where({ id })
    .del()
// --------------------------------------------|
module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}
