/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ListResponse_NamedModelSchema_ = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'NamedModelSchema',
            },
            isRequired: true,
        },
        total: {
            type: 'number',
            description: `Total number of items.`,
            isReadOnly: true,
            isRequired: true,
        },
    },
} as const;
