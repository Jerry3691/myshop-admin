import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get("password");
    const cpassword = control.parent.get("cpassword");

    if (!password || !cpassword) {
        return null;
    }

    if (cpassword.value === "") {
        return null;
    }

    if (password.value === cpassword.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
