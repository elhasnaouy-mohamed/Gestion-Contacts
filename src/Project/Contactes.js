import { useState } from 'react';

export default function Contactes({ contacts, totalCount, searchTerm, onSearchChange, onEdit, onDelete }) {
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

    return (
        <section className="contacts-list card" aria-labelledby="contacts-list-title">
            <div className="contacts-list__heading">
                <div>
                    <p className="contact-form__eyebrow mb-1">Carnet d'adresses</p>
                    <h2 className="contacts-list__title h5 mb-0" id="contacts-list-title">Vos contacts</h2>
                </div>
                <span className="contacts-list__count" aria-label={`${totalCount} ${totalCount === 1 ? 'contact' : 'contacts'}`}>
                    {totalCount}
                </span>
            </div>
            <div className="contacts-list__toolbar">
                <div className="contacts-search">
                    <label className="visually-hidden" htmlFor="contacts-search">Rechercher un contact</label>
                    <input
                        className="form-control contacts-search__input"
                        id="contacts-search"
                        type="search"
                        value={searchTerm}
                        onChange={event => onSearchChange(event.target.value)}
                        placeholder="Rechercher par nom, téléphone ou e-mail..."
                    />
                    {searchTerm && (
                        <button
                            className="contacts-search__clear"
                            type="button"
                            onClick={() => onSearchChange('')}
                            aria-label="Effacer la recherche"
                        >
                            Effacer
                        </button>
                    )}
                </div>
                <span className="contacts-list__result-count">
                    {contacts.length} {contacts.length === 1 ? 'résultat' : 'résultats'}
                </span>
            </div>
            <div className="table-responsive">
                <table className="table table-hover contacts-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Téléphone</th>
                            <th scope="col">E-mail</th>
                            <th scope="col"><span className="visually-hidden">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length === 0 ? (
                            <tr>
                                <td className="contacts-table__empty" colSpan="5">
                                    {searchTerm
                                        ? 'Aucun contact ne correspond à votre recherche.'
                                        : 'Aucun contact pour le moment. Ajoutez votre premier contact avec le formulaire ci-dessus.'}
                                </td>
                            </tr>
                        ) : contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.nom}</td>
                                <td>{contact.prenom}</td>
                                <td>{contact.tellephone}</td>
                                <td>{contact.email}</td>
                                <td className="contacts-table__actions">
                                    {confirmingDeleteId === contact.id ? (
                                        <div className="contacts-table__confirmation" role="group" aria-label={`Confirmer la suppression de ${contact.prenom} ${contact.nom}`}>
                                            <span>Supprimer ?</span>
                                            <button
                                                className="btn contacts-table__delete-confirm"
                                                type="button"
                                                onClick={() => {
                                                    onDelete(contact.id);
                                                    setConfirmingDeleteId(null);
                                                }}
                                            >
                                                Confirmer
                                            </button>
                                            <button
                                                className="btn contacts-table__delete-cancel"
                                                type="button"
                                                onClick={() => setConfirmingDeleteId(null)}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="contacts-table__buttons">
                                            <button
                                                className="btn contacts-table__edit"
                                                type="button"
                                                onClick={() => onEdit(contact)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className="btn contacts-table__delete"
                                                type="button"
                                                onClick={() => setConfirmingDeleteId(contact.id)}
                                                aria-label={`Supprimer ${contact.prenom} ${contact.nom}`}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
