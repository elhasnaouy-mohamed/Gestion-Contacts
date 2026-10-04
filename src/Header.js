import './Header.css'

export default function Header({ titre = 'Gestion de stock', boutique = 'TechShop' }) {
    return (
        <header className="inventory-header">
            <div className="container py-4">
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <span className="inventory-header__mark" aria-hidden="true">T</span>
                        <div>
                            <p className="inventory-header__eyebrow mb-1">{boutique}</p>
                            <h1 className="inventory-header__title mb-0">{titre}</h1>
                        </div>
                    </div>
                    <div className="inventory-header__status align-self-start align-self-sm-center">
                        <span className="inventory-header__status-dot" aria-hidden="true" />
                        Inventaire
                    </div>
                </div>
            </div>
        </header>
    )
}