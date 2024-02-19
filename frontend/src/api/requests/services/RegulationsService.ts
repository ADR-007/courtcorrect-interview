/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page_RegulatorySchema_ } from '../models/Page_RegulatorySchema_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegulationsService {

    /**
     * Get Regulations
     * @param orderBy
     * @param search
     * @param categoryId
     * @param companyId
     * @param decisionId
     * @param publishDate
     * @param page Page number
     * @param size Page size
     * @returns Page_RegulatorySchema_ Successful Response
     * @throws ApiError
     */
    public static getRegulations(
        orderBy?: (string | null),
        search?: (string | null),
        categoryId?: (number | null),
        companyId?: (number | null),
        decisionId?: (number | null),
        publishDate?: (string | null),
        page: number = 1,
        size: number = 50,
    ): CancelablePromise<Page_RegulatorySchema_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/regulations',
            query: {
                'order_by': orderBy,
                'search': search,
                'category_id': categoryId,
                'company_id': companyId,
                'decision_id': decisionId,
                'publish_date': publishDate,
                'page': page,
                'size': size,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
