import React, {useCallback, useEffect} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram.js";

const Form = () => {

    const [country, setCountry] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [subject, setSubject] = React.useState('physical');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country, street, subject
        }
        tg.sendData(JSON.stringify(data));
    }, [])
    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.WebApp.offEvent('mainButtonClicked', onSendData);
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, []);

    useEffect(() => {
        if (!country || !street) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street]);


    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input type="text" className={'input'} placeholder={'Страна'} value={country} onChange={onChangeCountry}/>
            <input type="text" className={'input'} placeholder={'Улица'} value={street} onChange={onChangeStreet}/>
            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value="legal">Юр.лица</option>
                <option value="physical">Физ.лица</option>
            </select>
        </div>
    );
};

export default Form;