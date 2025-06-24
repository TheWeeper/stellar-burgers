import { TOrder } from "@utils-types"

export type TOrdersState = {
    orders: TOrder[];
    loading: boolean;
    error: string | null;
}
