import { useEffect, useState } from "react";

import CommonStore from '@app/store/common'

export function useLoading() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        CommonStore.subscribe((state) => setLoading(state.loading))
        return () => {
            CommonStore.destroy();
        }
    }, [])
    return { loading }
}