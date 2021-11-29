import useSWR from 'swr'

export default function useFetch(url) {
    const fetcher = (api) => fetch(api).then(res => res.json())
    const { data, error } = useSWR(url, fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}