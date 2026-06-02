import { useEffect, useState } from "react";

// T means the type of data that we are fetching, it can be products, categories, or any other type of data.
// Input is give me a function that returns a promise of type T, and output is an object that contains data of type T, loading of type boolean, and error of type string or null.
export function useFetch<T>(fetchFn: () => Promise<T>) {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // isMounted is a flag that we use to check if the component is still mounted or not, because if the component is unmounted while we are fetching data, we don't want to update the state of an unmounted component, because it will cause a memory leak and a warning in the console.
        let isMounted = true;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                //it means like const result = await getProducts(); but we are passing it as a parameter to make it reusable for other components like categories and etc.
                const result = await fetchFn();

                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Something went wrong"
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [fetchFn]);

    return {
        data,
        loading,
        error,
    };
}