import { httpService, dummyData } from '@/services/http.service.js';
import utilService from './utils.js'

const DB = 'BTDB';
let contacts;

async function loadContacts(){
    contacts = _loadDB()?.contacts;
    if (!contacts) {
        contacts = await dummyData();
        // contacts = await httpService.get('http://www.filltext.com/?rows=40&_id={index}&f={firstName}&l={lastName}&p={phone}&e={email}');

        _saveDB();
    }
}

async function query(filterBy = '') {
    if (!contacts) await loadContacts()
    const regex = new RegExp(filterBy, 'i');
    return contacts.filter((contact) => regex.test(contact.n));
}

async function getById(contactId) {
    if (!contacts) await query()
    return contacts.filter((contact) => contact._id === contactId);
}

function update(updatedContact) {
    loadContacts()
    const idx = contacts.findIndex((contact) => contact._id === updatedContact._id);
    contacts[idx] = updatedContact;
    _saveDB();
    return updatedContact;
}

function save(newContact) {
    loadContacts()
    const contactToAdd = { ...newContact, _id: utilService.makeId() };
    contacts.unshift(contactToAdd);
    _saveDB();
    return contactToAdd;
}

function remove(contactId){
    loadContacts();
    const idx = contacts.findIndex((contact) => contact._id === contactId);
    contacts.splice(idx,1);
    _saveDB();
}

function _saveDB() {
    localStorage.setItem(DB, JSON.stringify({ ..._loadDB(), contacts }));
}

function _loadDB() {
    const tempDB = localStorage.getItem(DB);
    if (tempDB) return JSON.parse(tempDB);
    return null;
}

export default {
    loadContacts,
    query,
    getById,
    update,
    save,
    remove
};
