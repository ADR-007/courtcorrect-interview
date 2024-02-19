import React from 'react';

import { useInitial } from './useInitial';


// This an optional component for development purposes
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions,import/no-unresolved
const ComponentPreviews = React.lazy(() => import('./previews'));

export {
    ComponentPreviews,
    useInitial
};