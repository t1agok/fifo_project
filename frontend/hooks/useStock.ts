import { useState, useEffect, useCallback } from 'react';
import { fetchStock } from '@/lib/api';
import { StockInterface } from '@/lib/types';

export function useStock() {
    const [stockData, setStockData] = useState<StockInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStockData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchStock();
            setStockData(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load stock data');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStockData();
    }, [fetchStockData]);

    return { stockData, loading, error, refetchStock: fetchStockData };
}