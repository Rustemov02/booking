import axiosInstance from "./axios";

interface ApiRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
}
const apiRequest = async ({
  method,
  url,
  data,
  params,
  headers,
  onSuccess,
  onError,
}: ApiRequestOptions) => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
      headers,
    });

    onSuccess?.(response.data);
    return response.data;
  } catch (error: any) {
    onError?.(error);
    console.log("API Error : ", error);
    throw error; // tutulan erroru yuxarı komponentə ötürmək üçün
  }
};

export default apiRequest;
