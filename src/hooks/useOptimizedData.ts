import { useMemo, useCallback, useState, useEffect } from 'react';

// 데이터 필터링 최적화 훅
export function useFilteredData<T>(
  data: T[],
  filters: Record<string, any>,
  searchFields: (keyof T)[],
  sortField?: keyof T
) {
  return useMemo(() => {
    let filtered = data;

    // 검색 필터 적용
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' && 
                 value.toLowerCase().includes(searchTerm);
        })
      );
    }

    // 상태 필터 적용
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(item => 
        (item as any).status === filters.status
      );
    }

    // 분류 필터 적용
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => 
        (item as any).category === filters.category
      );
    }

    // 정렬 적용
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal);
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return bVal - aVal; // 내림차순
        }
        return 0;
      });
    }

    return filtered;
  }, [data, filters, searchFields, sortField]);
}

// 통계 계산 최적화 훅
export function useStats<T>(
  data: T[],
  statsConfig: {
    total?: boolean;
    count?: (item: T) => boolean;
    sum?: (item: T) => number;
    average?: (item: T) => number;
    custom?: Record<string, (items: T[]) => any>;
  }
) {
  return useMemo(() => {
    const stats: Record<string, any> = {};

    if (statsConfig.total) {
      stats.total = data.length;
    }

    if (statsConfig.count) {
      stats.count = data.filter(statsConfig.count).length;
    }

    if (statsConfig.sum) {
      stats.sum = data.reduce((acc, item) => acc + statsConfig.sum!(item), 0);
    }

    if (statsConfig.average) {
      const total = data.reduce((acc, item) => acc + statsConfig.average!(item), 0);
      stats.average = data.length > 0 ? total / data.length : 0;
    }

    if (statsConfig.custom) {
      Object.entries(statsConfig.custom).forEach(([key, fn]) => {
        stats[key] = fn(data);
      });
    }

    return stats;
  }, [data, statsConfig]);
}

// 디바운스 훅
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 로컬 스토리지 동기화 훅
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// 비동기 데이터 로딩 훅
export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
}

// 무한 스크롤 훅
export function useInfiniteScroll<T>(
  items: T[],
  itemsPerPage: number = 20
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = Math.min(itemsPerPage, items.length);
    setDisplayedItems(items.slice(startIndex, endIndex));
    setCurrentPage(0);
    setHasMore(endIndex < items.length);
  }, [items, itemsPerPage]);

  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    
    if (startIndex < items.length) {
      const newItems = items.slice(startIndex, endIndex);
      setDisplayedItems(prev => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < items.length);
    }
  }, [currentPage, items, itemsPerPage]);

  return { displayedItems, loadMore, hasMore };
}

// 가상화 리스트 훅 (대용량 데이터용)
export function useVirtualList<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight
    }));
  }, [items, scrollTop, itemHeight, containerHeight]);

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    handleScroll
  };
}

export default {
  useFilteredData,
  useStats,
  useDebounce,
  useLocalStorage,
  useAsyncData,
  useInfiniteScroll,
  useVirtualList
};