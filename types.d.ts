interface IFiltersBrand {
    name: string;
    code: string;
    values: string[]
}

interface IFiltersModel {
    name: string;
    type: string;
    values: IFiltersModelValues[]
}

interface IFiltersModelValues {
    brand: string;
    models: string[]
}

interface IFiltersTariff {
    name: string;
    type: string;
    values: TarifValues
}

type TarifValues = {
    [key: string]: string;
};

type CarModel = {
    brand: string;
    models: string[];
  };
  
  type Brands = {
    name: string;
    code: string;
    values: string[];
  };
  
  type Models = {
    name: string;
    type: string;
    values: CarModel[];
  };
  
  type TarifValues = {
    [key: string]: string;
  };
  
  type Tarif = {
    name: string;
    type: string;
    values: TarifValues;
  };
  
  type ApiResponseFilters = {
    result: number;
    brands: Brands;
    models: Models;
    tarif: Tarif;
  };

  interface ICar {
    id: number;
    brand: string;
    model: string;
    number: string;
    price: number;
    image: string;
    tarif: string[];
  }
  
  interface ICarList {
    result: number;
    page: number;
    pages: number;
    per_page: number;
    list: Car[];
  }

  interface ICarResponce {
    data: ICarList
  }