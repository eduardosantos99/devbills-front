import { APIService } from '../services/api';
import { Category } from '../services/api-types';
import { CreateCategoryData } from '../validators/types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

interface FecthAPIProps {
  createCategory: (data: CreateCategoryData) => Promise<void>;
  fetchCategories: () => Promise<void>;
  categories: Category[];
}

const FetchAPIContext = createContext<FecthAPIProps>({} as FecthAPIProps);

type FetchAPIProviderProps = {
  children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    await APIService.createCategory(data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories();

    setCategories(data);
  }, []);

  return (
    <FetchAPIContext.Provider
      value={{ categories, createCategory, fetchCategories }}
    >
      {children}
    </FetchAPIContext.Provider>
  );
}

export function useFetchAPI(): FecthAPIProps {
  return useContext(FetchAPIContext);
}
