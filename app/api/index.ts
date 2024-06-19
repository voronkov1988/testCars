const BASE_URL = 'https://test.taxivoshod.ru/api/test/'

export const getFiltersApi = async (): Promise<ApiResponseFilters> => {
    return fetch(`${BASE_URL}?w=catalog-filter`)
    .then(res => res.json())
    .catch(err => {
        return 'Что-то пошло не так' + err.message
    })
}

export const getCatalogApi = async (data: any) => {
    const brandsQueryParam = data.brand.join('&brand[]=');
    const modelsQueryParam = data.models.join('&model[]=')
    // const tariffsQueryParam = data.tarif.join('&tarif[]=')
    // &tarif[]=${tariffsQueryParam}
    return fetch(`${BASE_URL}?w=catalog-cars&brand[]=${brandsQueryParam}&model[]=${modelsQueryParam}&page=${data.page}`)
      .then((res) => res.json())
      .catch((err) => {
        return 'Что-то пошло не так' + err.message;
      });
  };
//   https://test.taxivoshod.ru/api/test/?w=catalog-car&id=1524

export const getPageApi = async (id: string) => {
    return fetch(`${BASE_URL}?w=catalog-car&id=${id}`)
      .then((res) => res.json())
      .catch((err) => {
        return 'Что-то пошло не так' + err.message;
      });
  };