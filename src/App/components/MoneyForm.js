import { Form, Modal, Select, InputNumber } from "antd";
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from "react";
import API from '../../API';


// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps
};

const MoneyForm = ({ visible, onCancel, currency, handleSetMoneyId, formName, formTitle, isEditForm, selected }) => {
    const [form] = Form.useForm();
    useResetFormOnCloseModal({
        form,
        visible,
    });
    //state for loading after click
    const [loading, setLoading] = useState(false)

    const onOk = () => {
        const amount = form.getFieldValue('amount') || null;
        const currency_id = form.getFieldValue('currency_id') || null;
        setLoading(true)
        if (isEditForm) {
            const money_id = formName === 'commitmentAmountForm' ? selected?.commitment_amount?.id : selected?.total_project_cost?.id;
            const payload = {amount, currency_id }
        
            API.updateMoney(payload, money_id)
                .then(({ data }) => {
                    handleSetMoneyId(data.id);
                    form.submit();
                });
        }
        else {
            API.createMoney({ amount, currency_id })
                .then(({ data }) => {
                    handleSetMoneyId(data.id);
                    form.submit();
                });
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000);

    };

    const data = formName === 'commitmentAmountForm' ? {
        amount: selected?.commitment_amount?.amount,
        currency_id: selected?.commitment_amount?.currency?.id
    } : {
            amount: selected?.total_project_cost?.amount,
            currency_id: selected?.total_project_cost?.currency?.id
        }

    return (
        <Modal width={700} title={formTitle} visible={visible} onOk={onOk} onCancel={onCancel} confirmLoading={loading}>
            <Form form={form} layout="inline" name={formName}
                initialValues={data}
            >
                <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                    <InputNumber style={{ width: 180 }} />
                </Form.Item>
                <Form.Item
                    label="Currency"
                    name="currency_id"
                    rules={[
                        {
                            required: true,
                            message: "Currency is required",
                        },
                    ]}
                >
                    <Select style={{ width: 180 }}>
                        {currency.map(({ id, name }) => (
                            <Select.Option key={id} value={id}>{name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MoneyForm;

MoneyForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    formName: PropTypes.string.isRequired,
    formTitle: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    handleSetMoneyId: PropTypes.func.isRequired,
    currency: PropTypes.array.isRequired,
}
