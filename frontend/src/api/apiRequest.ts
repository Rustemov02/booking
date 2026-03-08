import toast from "react-hot-toast";
import axiosInstance from "./axios";

interface ApiRequestOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  showErrorToast?: boolean;
}
const apiRequest = async ({
  method,
  url,
  data,
  params,
  headers,
  onSuccess,
  onError,
  showErrorToast = true,
}: ApiRequestOptions) => {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
      headers,
    });

    if (!response) {
      throw "error";
    }
    onSuccess?.(response.data);
    return response.data;
  } catch (error: any) {
    onError?.(error);
    console.log("API Error : ", error);
    if (showErrorToast) {
      toast.error("Xəta baş verdi !");
    }
    throw error; // tutulan erroru yuxarı komponentə ötürmək üçün
  }
};

export default apiRequest;
