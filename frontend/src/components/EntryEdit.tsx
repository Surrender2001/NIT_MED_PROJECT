import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Col, DatePicker, Form, Modal, Row, Select, Space} from 'antd';
import {useParams} from "react-router-dom";
import {getProfessionSelectors} from "../utils/Selectors";
import {Doctor} from "../dto/Doctor";
import {DoctorService} from "../services/DoctorService";
import {DefaultOptionType} from "antd/es/select";
import {MessageService} from "../services/MessageService";
import {VisitService} from "../services/VisitService";
import {Visit} from "../dto/Visit";

const {Item} = Form;


export const EntryEdit: FC = () => {
    const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const patientId = useParams();
    const [professionId, setProfessionId] = useState(undefined);
    const [professionSelectors, setProfessionSelectors] = useState(new Array());
    const [loading, setLoading] = useState(true);
    const [updateNeeded, setUpdateNeeded] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>(new Array());
    const [isDisabled, setIsDisabled] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visits, setVisits] = useState<Visit[]>(new Array());
    useEffect(() => {
        getProfessionSelectors().then(result => setProfessionSelectors(result)).finally(() => setLoading(false))
    }, []);
    useEffect(() => {
        updateNeeded && getDoctors(professionId);
    }, [updateNeeded]);

    const showModal = () => {
        setIsModalOpen(true);

    };

    const getVisits = (doctorId: number) => {
        setLoading(true);
        VisitService.getVisits(doctorId).then(result => setVisits(result.data)).finally(() => {
            setLoading(false);
            setUpdateNeeded(false)
        });
    }

    const handleOk = () => {
        setIsModalOpen(false);
        MessageService.success();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getDoctors = (professionId?: number) => {
        setLoading(true);
        console.log(professionId)
        DoctorService.getDoctors(professionId).then(result => setDoctors(result.data)).finally(() => {
            setLoading(false);
            setUpdateNeeded(false)
        });
    }
    const handleGetDoctors = (value: any, option: (DefaultOptionType | DefaultOptionType[])) => {
        setProfessionId(value);
        console.log(value)
        setIsDisabled(false)
        // getVisits(value);
        setUpdateNeeded(true);
    }
    return (
        <>


            <Card title={'Запись к врачу'}>
                <Row gutter={32}>
                    <Col span={4}>
                        <Card title={'Специальность'}>
                            <Select style={{width: "200px"}}
                                    disabled={loading}
                                    loading={loading}
                                    placeholder='Выберете специальность'
                                    onChange={handleGetDoctors}
                            >
                                {professionSelectors}
                            </Select>
                        </Card>
                        <Card title={'Дата приёма'}>
                            <DatePicker placeholder={"Выберете дату"} disabled={isDisabled}/>
                        </Card>
                    </Col>
                    <Col span={20}>
                        <Card title='Врачи' loading={loading}>
                            <Row gutter={[32, 32]}>
                                {doctors.length > 0 && doctors.map((doctor) =>
                                    <Col span={6} key={doctor.id}>
                                        <Card title={`ФИО ${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`}>
                                            <Space direction={'vertical'} size={"large"}>
                                                <div>Специальность {doctor.profession?.profession}</div>
                                                <div>
                                                    <Button type="primary" onClick={showModal}>Записаться</Button>
                                                </div>
                                            </Space>
                                        </Card>
                                    </Col>
                                )}
                            </Row>

                        </Card>

                    </Col>
                </Row>
            </Card>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/*{visits.length > 0 && workingHours.map((hour)=>{*/}
                {/*    <Button type={'primary'} disabled={}></Button>*/}

                {/*})*/}
                {/*}*/}
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};
