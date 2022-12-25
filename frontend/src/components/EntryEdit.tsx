import React, {FC, useEffect} from 'react';
import {Card, Form} from 'antd';
import {useParams} from "react-router-dom";

const {Item} = Form;


export const EntryEdit: FC = () => {
    const patientId = useParams();
    useEffect(() => {
        console.log(patientId)
    }, []);

    return (
        <>
            <Card title={'Выберете специальность врача'}>

            </Card>
        </>
    );
};
