import useVuelidate, {
    GlobalConfig,
    Validation,
    ValidationArgs,
} from '@vuelidate/core'
import {reactive, Ref, UnwrapNestedRefs} from 'vue'

export type TFormArguments<T> = [
    initialValues: T,
    validations: ValidationArgs,
    vuelidateConfig?: GlobalConfig
]

export interface TForm<T> {
    values: UnwrapNestedRefs<T>
    $v: Ref<Validation>,
    reset: () => void
}

export function useForm<T extends object>(
    ...args: TFormArguments<T>
): TForm<T> {
    const [initialValues, validations, vuelidateConfig] = args

    let values = reactive<T>(initialValues)
    const initialValuesCopy = {...initialValues}
    const $v = useVuelidate(validations, values, vuelidateConfig)
    const reset = () => {
        values = {}
        $v.value.$reset()
    }
    return {values, $v, reset}
}
