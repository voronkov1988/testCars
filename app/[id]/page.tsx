'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getPageApi } from "../api";
import { Carousel, Button } from 'antd';
import styles from './page.module.css'

export default function CarPage() {
    const pathname = usePathname()
    const router = useRouter()
    const [data, setData] = useState<any>({})

    useEffect(() => {
        const id = pathname.substring(1)
        getPageApi(id).then(res => {
            if (res.result === 1) {
                setData(res.item)
            } else alert('Чтото пошло не так')
        });
    }, []);

    return (
        <main>
            <div style={{ width: '250px' }}>
                <main>
                    <div className={styles.wrapper}>
                        <div style={{ width: '350px' }}>
                            <Carousel arrows infinite={true}>
                                {
                                    data?.images?.map((item: { image: string, id: number }) => {
                                        return <div key={item.id}>
                                            <img src={item.image} alt="Image 1" style={{ width: '100%' }} />
                                        </div>
                                    })
                                }

                            </Carousel>
                        </div>
                        <div className={styles.infoBlock}>
                            <h2>{data.model}</h2>
                            <p>{data.brand}</p>
                            <p>{data.price}</p>
                            {
                                data?.tarif?.map((item: string) => {
                                    return <span key={item}>{item}</span>
                                })
                            }
                        </div>
                    </div>
                    <div style={{position:'absolute', right: '100px'}}><Button onClick={()=>router.push('/')}>Назад</Button></div>
                </main>
            </div>
        </main>
    );
}