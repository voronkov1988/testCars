import { useEffect, useRef, useState, useMemo } from 'react';
import styles from './CustomSelect.module.css';
import useClickOutside from '@/app/hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { updateCheckedBrands, updateCheckedModels, updateCheckedTariffs } from '@/app/store/slices/filterSlice';

export const CustomSelect = ({ data, title, type }: any) => {
  const dispatch = useDispatch();
  const state: any = useSelector<any>((state) => state);
  const [openSelect, setOpenSelect] = useState(false);
  const addBlockButtonsRef = useRef(null);

  const handleClickOutside = () => {
    setOpenSelect(false);
  };

  const handleCheckType = (item: string) => {
    if (type === 'brand') dispatch(updateCheckedBrands(item));
    if(type === 'model') dispatch(updateCheckedModels(item))
    if(type === 'tarif') dispatch(updateCheckedTariffs(item))
  };

  const handleAddStyle = useMemo(() => {
    if(type === 'brand') {
        return (item: string) => {
            if (state.checkedBrands.includes(item)) {
              return { backgroundColor: '#bb8f8f', color: '#fff' };
            }
            return {};
          };
    }
    else if(type === 'model') {
        return (item: string) => {
            if (state.checkedModels.includes(item)) {
              return { backgroundColor: '#bb8f8f', color: '#fff' };
            }
            return {};
          };
    } else {
        return (item: string) => {
            if (state.checkedTariffs.includes(item)) {
              return { backgroundColor: '#bb8f8f', color: '#fff' };
            }
            return {};
          };
    }
  }, [state.checkedBrands, state.checkedModels, state.checkedTariffs]);
  

  useClickOutside(addBlockButtonsRef, handleClickOutside);

  return (
    <div ref={addBlockButtonsRef} className={styles.btnAdd}>
      <div onClick={() => setOpenSelect(!openSelect)} className={styles.btnAddBlock}>
        <button>Выберите {title}</button>
      </div>
      {openSelect && (
        <div className={styles.addBlockButtons}>
          {data?.map((item: string, i: number) => {
            const itemStyle = handleAddStyle(item);
            return (
              <span
                style={itemStyle}
                onClick={() => handleCheckType(item)}
                key={i}
              >
                {item}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};