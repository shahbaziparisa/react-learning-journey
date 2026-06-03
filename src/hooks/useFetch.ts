import { useEffect, useReducer } from "react";

//we use generic type T to make the hook reusable for different types of data, for example, we can use it to fetch products, categories, or any other type of data. T is a placeholder for the actual type that will be used when we call the hook in a component. We will replace T with the actual type when we call the hook in a component, for example, if we want to fetch products, we will replace T with Product[] which means an array of products.
type State<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

//we use generic <T> because we do not know the type will return when we call the hook in a component, it can be products, categories, or any other type of data, so we use generic to make the hook reusable for different types of data.
type Action<T> =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: T }
    | { type: "FETCH_ERROR"; payload: string };

// T means the type of data that we are fetching, it can be products, categories, or any other type of data.
// Input is give me a function that returns a promise of type T, and output is an object that contains data of type T, loading of type boolean, and error of type string or null.
export function useFetch<T>(fetchFn: () => Promise<T>) {

    //normal using different states
    // const [data, setData] = useState<T | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    //and now usereducer test 


    const initialState: State<T> = {
        data: null,
        loading: true,
        error: null,
    };
    // Generic یعنی “نوع را از بیرون بده، من داخل تابع استفاده می‌کنم”
    // We use generic T to tell TypeScript that the type is not known yet,
    // and it will be provided later when the function is used.
    function fetchingReducer<T>(
        state: State<T>,
        action: Action<T>
    ): State<T> {
        switch (action.type) {
            case "FETCH_START":
                return {
                    ...state,
                    loading: true,
                    error: null,
                };

            case "FETCH_SUCCESS":
                return {
                    data: action.payload,
                    loading: false,
                    error: null,
                };

            case "FETCH_ERROR":
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };

            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(
        fetchingReducer<T>,
        initialState
    );


    useEffect(() => {
        // isMounted is a flag that we use to check if the component is still mounted or not, because if the component is unmounted while we are fetching data, we don't want to update the state of an unmounted component, because it will cause a memory leak and a warning in the console.
        let isMounted = true;

        const load = async () => {
            try {
                dispatch({
                    type: "FETCH_START",
                });

                //it means like const result = await getProducts(); but we are passing it as a parameter to make it reusable for other components like categories and etc.
                const result = await fetchFn();

                if (isMounted) {
                    // setData(result);
                    dispatch({
                        type: "FETCH_SUCCESS",
                        payload: result
                    });
                }
            } catch (err) {
                if (isMounted) {
                    dispatch({
                        type: "FETCH_ERROR",
                        payload:
                            err instanceof Error
                                ? err.message
                                : "Something went wrong",
                    });
                }
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [fetchFn]);

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
    };
}