
import { useState, useRef } from 'react';
import Contactes from './Contactes';
import '../Style/Forme.css'

export default function Forme() {

    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const formRef = useRef(null);
    const nextId = useRef(0);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const contactDetails = {
            nom: formData.get('nom').trim(),
            prenom: formData.get('prenom').trim(),
            tellephone: formData.get('telephone').trim(),
            email: formData.get('email').trim()
        };

        if (editingId !== null) {
            setContacts(currentContacts => currentContacts.map(contact => (
                contact.id === editingId ? { ...contact, ...contactDetails } : contact
            )));
            setEditingId(null);
        } else {
            setContacts(currentContacts => [
                ...currentContacts,
                { id: nextId.current++, ...contactDetails }
            ]);
        }

        event.currentTarget.reset();
    }

    function handleEdit(contact) {
        setEditingId(contact.id);
        formRef.current.elements.nom.value = contact.nom;
        formRef.current.elements.prenom.value = contact.prenom;
        formRef.current.elements.telephone.value = contact.tellephone;
        formRef.current.elements.email.value = contact.email;
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        formRef.current.elements.nom.focus({ preventScroll: true });
    }

    function handleCancelEdit() {
        setEditingId(null);
        formRef.current.reset();
    }

    function handleDelete(contactId) {
        setContacts(currentContacts => currentContacts.filter(contact => contact.id !== contactId));
        if (editingId === contactId) {
            setEditingId(null);
            formRef.current.reset();
        }
    }

    const normalizedSearchTerm = searchTerm
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    const filteredContacts = contacts.filter(contact => (
        [contact.nom, contact.prenom, contact.tellephone, contact.email]
            .some(value => value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase()
                .includes(normalizedSearchTerm))
    ));

    return (
        <main className="contacts-page container py-4 py-md-5">
            <div className="contacts-intro">
                <p className="contacts-intro__eyebrow mb-2">Votre espace de contacts</p>
                <h2 className="contacts-intro__title">Gardez vos contacts à portée de main.</h2>
                <p className="contacts-intro__text mb-0">
                    Ajoutez et retrouvez facilement les informations importantes de votre carnet d'adresses.
                </p>
            </div>
            <section className={`contact-form card mb-4${editingId !== null ? ' contact-form--editing' : ''}`} aria-labelledby="contact-form-title">
                <form className="card-body p-4" ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <p className="contact-form__eyebrow mb-1">
                            {editingId !== null ? 'Modification' : 'Nouveau contact'}
                        </p>
                        <h2 className="contact-form__title h4 mb-0" id="contact-form-title">
                            {editingId !== null ? 'Modifier le contact' : 'Ajouter un contact'}
                        </h2>
                    </div>
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="contact-nom">Nom</label>
                            <input className="form-control" id="contact-nom" name="nom" type="text" autoComplete="family-name" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="contact-prenom">Prénom</label>
                            <input className="form-control" id="contact-prenom" name="prenom" type="text" autoComplete="given-name" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="contact-telephone">Téléphone</label>
                            <input className="form-control" id="contact-telephone" name="telephone" type="tel" autoComplete="tel" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="contact-email">E-mail</label>
                            <input className="form-control" id="contact-email" name="email" type="email" autoComplete="email" required />
                        </div>
                        <div className="col-12 d-flex flex-column flex-sm-row justify-content-end gap-2">
                            {editingId !== null && (
                                <button className="btn contact-form__cancel" type="button" onClick={handleCancelEdit}>
                                    Annuler
                                </button>
                            )}
                            <button className="btn contact-form__submit" type="submit">
                                {editingId !== null ? 'Enregistrer les modifications' : 'Ajouter le contact'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
            <Contactes
                contacts={filteredContacts}
                totalCount={contacts.length}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </main>
    );
}