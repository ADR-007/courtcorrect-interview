import {FieldValues, UseFormReturn} from "react-hook-form-mui";

import {ApiError, HTTPValidationError} from "../requests";

export function mapApiErrorsToForm<TFieldValues extends FieldValues>(
    error: unknown,
    form: UseFormReturn<TFieldValues>
) {
    // Cast form to correct type
    const typedForm = form as unknown as UseFormReturn<Record<string, unknown>>;
    console.error(error)
    if (error instanceof ApiError) {
        if (Array.isArray(error.body?.detail)) {
            const payload = error.body as HTTPValidationError;
            payload.detail?.forEach((errorItem) => {
                typedForm.setError(
                    String(errorItem.loc[errorItem.loc.length - 1]),
                    {message: errorItem.msg},
                );
            });
        } else {
            typedForm.setError("root", {message: error.body.detail});
        }
    } else {
        typedForm.setError("root", {message: "Unknown Error"});
    }
}

