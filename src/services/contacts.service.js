import { httpService } from '@/services/http.service.js';

const DB = 'BTDB';
let contacts;

async function loadContacts(){
    contacts = _loadDB();
    if (!contacts) {
        contacts = await httpService.get('http://www.filltext.com/?rows=40&_id={index}&f={firstName}&l={lastName}&p={phone}&e={email}');
        contacts.forEach((contact) => (contact.imgUrl = `https://robohash.org/${contact.e}?set=set5`));
        _saveDB();
    }
}

async function query(filterBy = '') {
    if (!contacts) await loadContacts()
    const regex = new RegExp(filterBy, 'i');
    return contacts.filter((contact) => regex.test(contact.f + ' ' + contact.l));
}

async function getById(contactId) {
    if (!contacts) await query()
    return contacts.filter((contact) => contact._id === +contactId);
}

function update(updatedContact) {
    loadContacts()
    const idx = contacts.findIndex((contact) => contact._id === updatedContact._id);
    contacts[idx] = updatedContact;
    _saveDB();
}

function save(newContact) {
    loadContacts()
    const contactToAdd = { ...newContact, _id: new Date() % 1000 };
    contacts.unshift(contactToAdd);
    _saveDB();
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
    if (tempDB) return JSON.parse(tempDB).contacts;
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
