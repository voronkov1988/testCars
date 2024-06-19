import { AppInterface, changePage } from "@/app/store/slices/filterSlice";
import { Card } from "../Card/Card"
import styles from './CardWrapper.module.css'
import { Pagination } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import React from "react";

export const CardWrapper = ({ data }: ICarResponce) => {
    const dispatch = useDispatch()
    const currentPage:any = useSelector<any>(state => state.currentPage)


    const handleChangePage = (page:number) => {
        dispatch(changePage(page))
    }

    return (
        <div>
            <div className={styles.listWrapper}>
                {
                    data.list.map((item, i) => {
                        return <React.Fragment key={i}><Card card={item} /></React.Fragment>
                    })
                }
            </div>
            <div className={styles.pagination}>
                <Pagination onChange={handleChangePage} defaultCurrent={currentPage} total={data.pages * 10} />
            </div>
        </div>
    )
}