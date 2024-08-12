import { SCREEN_NAME } from '@constants';
import { DataModels } from '@models';

export const useNavigate = (navigation: any) => {
  const openSearchScreen = (
    searchFilter: DataModels.ISearchFilter,
    params?: any,
  ) => {
    navigation.navigate(SCREEN_NAME.SEARCH_NAVIGATOR, {
      screen: SCREEN_NAME.SEARCH,
      params: { ...searchFilter, ...params },
    });
  };

  const openFilterScreen = (priceRange: number[]) => {
    navigation.navigate(SCREEN_NAME.SEARCH_NAVIGATOR, {
      screen: SCREEN_NAME.FILTER_SCREEN,
      params: { priceRange },
    });
  };

  return { openSearchScreen, openFilterScreen };
};
