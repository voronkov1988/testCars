import styles from './Card.module.css'
// import Image from 'next/image'
import Link from 'next/link'

interface ICarProps {
    card: ICar
}

export const Card = ({ card }: ICarProps) => {
    return (
        <div className={styles.cardWrapper}>
            <Link href={{
                pathname: `/${card.id}`,
                query: `${card.id}`,
            }}><img src={card.image} alt={card.model} /></Link>
            <div className={styles.mainCard}>
                <div>
                    <h3>{card.model}</h3>
                    <span className={styles.brand}>{card.brand}</span>
                    <div style={{ marginTop: '10px', fontSize: '.75rem', color: 'red' }}>
                        {
                            card.tarif.map((item, i) => {
                                return <span key={i}>{item}</span>
                            })
                        }
                    </div>
                </div>
                <div style={{ marginTop: ' 5px' }}>
                    <p>{card.number}</p>
                    <p>{card.price} &#8381;</p>
                </div>
            </div>

        </div>
    )
}