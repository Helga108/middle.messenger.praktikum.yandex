const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

interface Options {
  timeout?: number;
  data?: object;
  method: string;
  headers?: object | object[];
}

function queryStringify(data: object): string {
  const stingifiedData = Object.keys(data).reduce(
    (acc: string, el: string) => acc.concat(`${el}=${(data as any)[el]}&`),
    "?"
  );
  return stingifiedData.substring(0, stingifiedData.length - 1);
}
export default class HTTPTransport {
  get = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (url: string, options: Options) => {
    if (options.data) {
      (options as any).data = queryStringify(options.data);
    }
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: Options, timeout: number = 5000) => {
    let { headers = {} }: any = options;
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET && data) {
        url = url + queryStringify(data);
      }
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;

      xhr.onerror = reject;

      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key: any) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
