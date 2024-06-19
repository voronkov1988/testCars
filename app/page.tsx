'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getCatalogApi, getFiltersApi } from "./api";
import { CustomSelect } from "./components/CustomSelect/CustomSelect";
import { useSelector } from "react-redux";
import { CardWrapper } from "./components/CardWrapper/CardWrapper";
import { AppInterface, filtrationModels } from "./store/slices/filterSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  const state: any = useSelector<AppInterface>(state => state)
  const [filtersBrand, setFIltersBrand] = useState<IFiltersBrand>()
  const [filtersModels, setFiltersModels] = useState<IFiltersModel>()
  const [filtersTariff, setFiltersTariff] = useState<IFiltersTariff>()

  const [catalogList, setCatalogList] = useState<ICarList>()

  useEffect(() => {
    getFiltersApi().then(res => {
      setFIltersBrand(res.brands)
      setFiltersModels(res.models)
      setFiltersTariff(res.tarif)
    })
  }, [])
  
  useEffect(() => {
    if(filtersBrand && filtersModels && filtersTariff) {
      const modelsArray:any = filtersModels?.values.reduce<any>((acc, item) => {
        return acc.concat(item.models);
      }, []);
      
      getCatalogApi({
        brand: state.checkedBrands.length === 0 ? filtersBrand?.values : state.checkedBrands, 
        models: state.checkedModels.length === 0 ? modelsArray : state.checkedBrands, 
        tarif: state.checkedTariffs.length === 0 ? Object.values(filtersTariff.values) : state.checkedTariffs,
        page: state.currentPage
      })
        .then(res => setCatalogList(res))
    }
  }, [filtersBrand, filtersModels, filtersTariff])

  useEffect(() => {
    if (filtersModels) {
      if (state.checkedBrands.length > 0) {
        const filteredModels: any = filtersModels.values.filter((model) =>
          state.checkedBrands.includes(model.brand)
        );
        const allModels: string[] = filteredModels.reduce(
          (acc: string[], obj: any) => [...acc, ...obj.models],
          []
        );
        dispatch(filtrationModels(allModels))  
      } else {
        const filteredModels: any = filtersModels.values.filter((model) =>
          filtersBrand?.values.includes(model.brand)
        );
        const allModels: string[] = filteredModels.reduce(
          (acc: string[], obj: any) => [...acc, ...obj.models],
          []
        );
        dispatch(filtrationModels(allModels))
      }
    }
  }, [state.checkedBrands]);

  useEffect(() => {
    if(filtersBrand && filtersModels && filtersTariff) {
      const modelsArray:any = filtersModels?.values.reduce<any>((acc, item) => {
        return acc.concat(item.models);
      }, []);
      
      getCatalogApi({
        brand: state.checkedBrands.length === 0 ? filtersBrand.values : state.checkedBrands, 
        page: state.currentPage,
        tarif: state.checkedTariffs.length === 0 && filtersTariff ? Object.values(filtersTariff.values) : state.checkedTariffs,
        models: state.checkedModels.length === 0 ? modelsArray : state.checkedModels})
        .then(res => setCatalogList(res))
        
    }
  }, [state])

  const modelsArray:any = filtersModels?.values.reduce<any>((acc, item) => {
    return acc.concat(item.models);
  }, []);

  return (
    <main>
      <div>
        {
          filtersBrand && filtersModels && filtersTariff ?
            <div className={styles.filters}>
              <div className={styles.oneFilter}>
                <span>Марка</span>
                <CustomSelect data={filtersBrand?.values} title={filtersBrand?.name} type={filtersBrand?.code} />
              </div>
              <div className={styles.oneFilter}>
                <span>Модель</span>
                <CustomSelect data={state.checkedBrands.length !== 0 ? state.filteredModels : modelsArray }
                  title={filtersModels?.name}
                  type={filtersModels?.type} />
              </div>

              <div className={styles.oneFilter}>
                <span>Тариф</span>
                <CustomSelect type={filtersTariff.type} title={filtersTariff.name}
                  data={Object.values(filtersTariff.values)}

                />
              </div>
            </div> : <div>loading</div>
        }
      </div>
      {
        catalogList ? <div className={styles.mainBlock}>
          <CardWrapper data={catalogList} />
        </div> : <div>loading</div>
      }
    </main>
  );
}
