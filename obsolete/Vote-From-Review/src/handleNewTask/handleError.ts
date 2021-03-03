import { showToastError } from '../../../common/showToast';

export const handleError = (error: unknown) => {
    // tslint:disable-next-line: no-console
    console.error(error);
    showToastError('Stack Vote From Review: An error occurred, see console for details');
};
