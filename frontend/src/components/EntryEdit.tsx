import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Col, DatePicker, DatePickerProps, Form, Modal, Row, Select, Space} from 'antd';
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
    const patientId = useParams<{ id?:string |undefined}>();
    const [professionId, setProfessionId] = useState(undefined);
    const [doctorId, setDoctorId] = useState(-1);
    const [professionSelectors, setProfessionSelectors] = useState(new Array());
    const [loading, setLoading] = useState(true);
    const [updateDoctorsNeeded, setUpdateDoctorsNeeded] = useState(false);
    const [updateVisitsNeeded, setUpdateVisitsNeeded] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>(new Array());
    const [isDisabled, setIsDisabled] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateOfReceipt, setDateOfReceipt] = useState<string | undefined>(undefined);
    const [visits, setVisits] = useState<Visit[]>(new Array());
    useEffect(() => {
        getProfessionSelectors().then(result => setProfessionSelectors(result)).finally(() => setLoading(false))
    }, []);
    useEffect(() => {
        updateDoctorsNeeded && getDoctors(professionId);
    }, [updateDoctorsNeeded]);
    useEffect(() => {
        updateVisitsNeeded && getVisits(doctorId);
    }, [updateVisitsNeeded]);

    const handleSignUp = (doctorId: number) => {
        if (dateOfReceipt === undefined) {
            MessageService.warn('Выберете дату приёма');
            return;
        }
        setDoctorId(doctorId);
        setUpdateVisitsNeeded(true);
        setIsModalOpen(true);
    };

    const getVisits = (doctorId: number) => {
        setLoading(true);
        VisitService.getVisits(undefined, doctorId, dateOfReceipt).then(result => setVisits(result.data)).finally(() => {
            setLoading(false);
            setUpdateVisitsNeeded(false)
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
        DoctorService.getDoctors(professionId).then(result => setDoctors(result.data)).finally(() => {
            setLoading(false);
            setUpdateDoctorsNeeded(false)
        });
    }
    const handleGetDoctors = (value: any, option: (DefaultOptionType | DefaultOptionType[])) => {
        setProfessionId(value);
        setIsDisabled(false)
        setUpdateDoctorsNeeded(true);
    }
    const hangleCheckDisable = (hour: number, visits: Visit[]) => {
        for (let i = 0; i < visits.length; i++) {
            if (visits[i].startHour === hour) {
                return true;
            }
        }
        return false;
    };
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDateOfReceipt(dateString === '' ? undefined : dateString);
        console.log(dateOfReceipt)
    }

    const handleCreateEntry = (doctorId: number, dateOfReceipt: string | undefined, hour: number) => {
        setLoading(true);
        VisitService.addVisit({
            patientId: Number(patientId.id),
            doctorId: doctorId,
            dateOfReceipt: dateOfReceipt,
            startHour: hour,
        } as Visit).then(() => MessageService.success())
            .then(()=>setUpdateVisitsNeeded(true))
            .finally(() => setLoading(false));
    };
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
                            <DatePicker placeholder={"Выберете дату"} disabled={isDisabled} onChange={onDateChange}/>
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
                                                    <Button type="primary"
                                                            onClick={() => handleSignUp(doctor.id)}>Записаться</Button>
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
            <Modal title="Выберете час приёма"
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={[]}
                   centered
                   style={{textAlign: 'center'}}
            >
                <br/>
                <Row gutter={[32, 32]}>
                    {
                        workingHours.map(hour =>
                            <Col span={8}>
                                <Button type={'primary'}
                                        disabled={hangleCheckDisable(hour, visits)}
                                        onClick={() => handleCreateEntry(doctorId, dateOfReceipt, hour)}
                                >
                                    {hour}:00
                                </Button>
                            </Col>
                        )
                    }
                </Row>
            </Modal>
        </>
    );
};
