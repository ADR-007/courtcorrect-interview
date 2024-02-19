/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RegulatorySchema = {
    properties: {
        category: {
            type: 'NamedModelSchema',
            isRequired: true,
        },
        category_id: {
            type: 'number',
            isRequired: true,
        },
        company: {
            type: 'NamedModelSchema',
            isRequired: true,
        },
        company_id: {
            type: 'number',
            isRequired: true,
        },
        decision: {
            type: 'NamedModelSchema',
            isRequired: true,
        },
        decision_id: {
            type: 'number',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        publish_date: {
            type: 'string',
            isRequired: true,
            format: 'date',
        },
        title: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
