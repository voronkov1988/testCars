import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '@/app/store/store'

export interface AppInterface {
    checkedBrands: string[];
    checkedModels: string[];
    currentPage: number;
    filteredModels: string[]
    checkedTariffs: string[]
}

const initialState: AppInterface = {
  checkedBrands: [],
  checkedModels: [],
  currentPage: 1,
  filteredModels: [],
  checkedTariffs: [],
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    updateCheckedBrands(state, action) {
      const brand = action.payload;
      const brandIndex = state.checkedBrands.indexOf(brand);
      if (brandIndex !== -1) {
        state.checkedBrands = state.checkedBrands.filter((item) => item !== brand);
      } else {
        state.checkedBrands = [...state.checkedBrands, brand];
      }
    },
    updateCheckedModels(state, action) {
      const model = action.payload;
      const modelIndex = state.checkedModels.indexOf(model);
      if (modelIndex !== -1) {
        state.checkedModels = state.checkedModels.filter((item) => item !== model);
      } else {
        state.checkedModels = [...state.checkedModels, model];
      }
    },
    updateCheckedTariffs(state, action) {
      const tariff = action.payload;
      const tariffIndex = state.checkedTariffs.indexOf(tariff);
      if (tariffIndex !== -1) {
        state.checkedTariffs = state.checkedTariffs.filter((item) => item !== tariff);
      } else {
        state.checkedTariffs = [...state.checkedTariffs, tariff];
      }
    },
    filtrationModels(state, action) {
      state.filteredModels = action.payload
    },
    changePage(state, action) {
      state.currentPage = action.payload
    }
  }
})

export const { updateCheckedBrands, changePage, filtrationModels, updateCheckedModels, updateCheckedTariffs } = appSlice.actions


export default appSlice.reducer