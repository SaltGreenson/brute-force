import {Field, Form, Formik} from 'formik';
import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setFilter, setLoading, setPassword, setQuantitySigns} from "../../redux/menu-reducer";
import {getAlphabet, getFilter, getPasswords, getProcessingBarPosition, getQuantitySigns} from "../selectors/selectors";
import s from "./MenuForm.module.css"



// компонента
export const MenuForm: React.FC = React.memo(() => {
    // создание переменной типа диспатч
    const dispatch = useDispatch()
    // получение фильтра из стейта
    const filter = useSelector(getFilter)
    // получение количества символов из стейта
    const quantity = useSelector(getQuantitySigns)
    // получение алфавита из стейта
    const alphabet = useSelector(getAlphabet)
    // создание локального стейта
    const [quantitySigns, setQuantitySignsLocal] = useState(quantity)
    // создание локального стейта
    const [filterLocal, setFilterLocal] = useState(filter)
    // получение пароля из стейта
    const passwords: string = useSelector(getPasswords)
    // получение местоположения прогресс бара
    const positionBar: number = useSelector(getProcessingBarPosition)

    const [fetching, setFetching] = useState(false)

    // функция которая вызывается во время создания компоненты
    useEffect(() => {
        // установка фильтра
        dispatch(setFilter(filter))
        // установка количества знаков
        dispatch(setQuantitySigns(quantitySigns))
    }, [])

    // функция которая вызывается во время изменения переменной quantitySigns
    useEffect(() => {
        // установка количества знаков
        dispatch(setQuantitySigns(quantitySigns))
    }, [quantitySigns])

    // функция которая вызывается во время изменения переменной passwords
    useEffect(() => {
        if (passwords.length !== 0) {
            download(passwords, "Generated Passwords")
        }
    }, [passwords])

    // функция которая вызывается во время изменения значения в поле ввода
    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantitySignsLocal(+e.currentTarget.value)
    }

    // функция создания ссылки для скачивания
    const download = (text: string, name: string, type:"MIME" = "MIME") => {
        dispatch(setLoading(true))
        // проверка на существующий элемент
        if (typeof window.URL.createObjectURL !== 'undefined') {
            // поиск элемента
            const a: any = document.getElementById("a");
            // создание объекта
            const file = new Blob([text], {type: type});
            // установка ссылки
            a.href = window.URL.createObjectURL(file);
            // установка иммени ссылки
            a.download = name;
            setFetching(true)
        }
        dispatch(setLoading(false))
    }

    // функция измнения значений в чекбоксе
    const changeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setFetching(false)
        // переменная которая получается значения из поля ввода
        const name: "hasRussianLetters" | "hasEnglishLetters" | "hasSigns" | "hasNumbers" = event.currentTarget.name as "hasRussianLetters" | "hasEnglishLetters" | "hasSigns" | "hasNumbers"
        // проверка на выбранный чекбокс
        if (event.currentTarget.checked) {
            // установка фильтра
            filterLocal[name] = true
            // изменение значения
            event.currentTarget.checked = true
        } else {
            filterLocal[name] = false
            event.currentTarget.checked = false
        }
        // функция изменения фильтра
        setFilterLocal(filterLocal)
        // установка фильтры
        dispatch(setFilter(filterLocal))
    }

    // функция сабмита формы
    const submit = async (values: FormType, {setSubmitting}: { setSubmitting: (setSubmitting: boolean) => void }) => {
        setFetching(false)
        // проверка введенных значений
        if ((values.hasRussianLetters || values.hasEnglishLetters || values.hasSigns || values.hasNumbers) && values.quantitySigns > 0 && values.quantitySigns < 4) {
            // установка сабмита
            setSubmitting(true)
            // высчет паролей
            await dispatch(setPassword(quantity, alphabet))
        }
        else{
            alert('Quantity of signs more than 3')
        }
        // установка субмита
        setSubmitting(false)
    }

    // возвращение компоненты
    return <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    hasRussianLetters: filter.hasRussianLetters,
                    hasEnglishLetters: filter.hasEnglishLetters,
                    hasSigns: filter.hasSigns,
                    hasNumbers: filter.hasNumbers,
                    quantitySigns: quantity
                } as FormType}
                onSubmit={submit}
            >
                {({isSubmitting}) => (

                    <Form>
                        <Field type="text" name="quantitySigns" onChange={onChangeQuantity}
                               value={quantitySigns}/> quantity signs <br/>
                        <Field type="checkbox" name="hasRussianLetters" onChange={changeCheckbox}
                               cheked={Boolean(filter.hasRussianLetters)}/> rus <br/>
                        <Field type="checkbox" name="hasEnglishLetters" onChange={changeCheckbox}
                               cheked={Boolean(filter.hasEnglishLetters)}/> eng <br/>
                        <Field type="checkbox" name="hasSigns" onChange={changeCheckbox}
                               cheked={Boolean(filter.hasSigns)}/> signs <br/>
                        <Field type="checkbox" name="hasNumbers" onChange={changeCheckbox}
                               cheked={Boolean(filter.hasNumbers)}/> num <br/>
                        <button type="submit" disabled={isSubmitting}>SUBMIT</button>

                    </Form>
                )}
            </Formik>
            <a href="" id="a" className={fetching? s.active : s.nonActive}>click here to download your file</a>
        </div>
})

// типы компоненты
type FormType = {
    hasRussianLetters: boolean,
    hasEnglishLetters: boolean,
    hasSigns: boolean,
    hasNumbers: boolean,
    quantitySigns: number
}