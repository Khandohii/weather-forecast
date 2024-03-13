import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const request = useCallback(async (url) => {
        setLoading(true);

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
            }

            const data = await res.json();

            setLoading(false);
            return data;
            
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;                
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};
