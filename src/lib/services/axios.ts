import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const request = async <T>(
	method: HttpMethod,
	url: string,
	requestBody?: Record<string, string> | string,
	config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
	try {
		switch (method) {
			case 'get':
				return await axios.get<T>(url, config);
			case 'post':
				return await axios.post<T>(url, requestBody, config);
			case 'put':
				return await axios.put<T>(url, requestBody, config);
			case 'delete':
				return await axios.delete<T>(url, config);
			default:
				throw new Error('Invalid HTTP method');
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default request;

const get = <T>(url: string, config?: AxiosRequestConfig) => {
	return request<T>('get', url, undefined, config);
};

const post = <T>(
	url: string,
	requestBody: Record<string, string> | string,
	config?: AxiosRequestConfig
) => {
	return request<T>('post', url, requestBody, config);
};

const put = <T>(
	url: string,
	requestBody: Record<string, string> | string,
	config?: AxiosRequestConfig
) => {
	return request<T>('put', url, requestBody, config);
};

export { get, post, put };
