import { apiGet } from "../ApiService";

interface CoinsResponse {
    coins: number;
}

export const fetchCoins = async (): Promise<CoinsResponse> => {
    return await apiGet<CoinsResponse>("/api/auth/user/coins/");
};
