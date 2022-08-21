import { ReactFieldError as FieldError } from '../errorMessage';
declare function useFieldApi(field: string): {
    getError: () => any;
    setError: (error: FieldError) => void;
    getTouched: () => boolean;
    setTouched: (isTouched: boolean) => void;
    getValue: () => any;
    setValue: (value: any) => void;
};
export default useFieldApi;
