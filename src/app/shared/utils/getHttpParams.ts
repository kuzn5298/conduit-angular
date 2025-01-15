import { HttpParams } from '@angular/common/http';

export const getHttpParams = (params: Record<string, any>): HttpParams => {
  let httpParams = new HttpParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      httpParams = httpParams.set(key, params[key]);
    }
  });
  return httpParams;
};
