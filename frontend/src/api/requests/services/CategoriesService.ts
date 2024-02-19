/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResponse_NamedModelSchema_ } from '../models/ListResponse_NamedModelSchema_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoriesService {

    /**
     * Get Categories
     * @returns ListResponse_NamedModelSchema_ Successful Response
     * @throws ApiError
     */
    public static getCategories(): CancelablePromise<ListResponse_NamedModelSchema_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/categories',
        });
    }

}
