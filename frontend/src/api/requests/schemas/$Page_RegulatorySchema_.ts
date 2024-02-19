/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Page_RegulatorySchema_ = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'RegulatorySchema',
            },
            isRequired: true,
        },
        page: {
            type: 'any-of',
            contains: [{
                type: 'number',
                minimum: 1,
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        pages: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
        },
        size: {
            type: 'any-of',
            contains: [{
                type: 'number',
                minimum: 1,
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
        total: {
            type: 'any-of',
            contains: [{
                type: 'number',
            }, {
                type: 'null',
            }],
            isRequired: true,
        },
    },
} as const;
