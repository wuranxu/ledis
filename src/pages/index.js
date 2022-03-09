import styles from './index.css';
import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Tooltip } from 'antd';
import logo from '@/assets/logo.svg';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import data from '@/utils/data';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function() {
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.validateFields().then((values, err) => {
      if (!err) {
        try {
          data.insertConnection(values);
          message.info('添加成功');
          setModal(false);
        } catch (e) {
          message.error(e.message)
        }
      }
    });
  };

  return (
    <div className={styles.normal}>
      <Modal title='新建redis连接' visible={modal}
             onOk={onSubmit}
             onCancel={() => setModal(false)}>
        <Form {...layout} form={form}>
          <Form.Item label='连接名称' name='name' rules={[
            {
              required: true,
              message: '请务必输入redis连接名称',
            },
          ]}>
            <Input placeholder='输入host' />
          </Form.Item>
          <Form.Item label='host' name='host' rules={[
            {
              required: true,
              message: '请务必输入redis连接地址',
            },
          ]}>
            <Input placeholder='输入host' />
          </Form.Item>
          <Form.Item label='password' name='password'>
            <Input placeholder='输入host' type='password' />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span={6}>
          <div>
            <div className={styles.logo}>
              <img src={logo} width={48} height={48} />
              <span className={styles.logoTitle}>Ledis</span>
              <div className={styles.buttonDiv}>
                <Button type='primary' onClick={() => setModal(true)}>
                  <PlusOutlined /> 新建连接
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.left}>

          </div>
        </Col>
        <Col span={18}>
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <div className={styles.rightIcon}>
                <Tooltip title='点击可打开设置页面'>
                  <SettingOutlined className={styles.icon} />
                </Tooltip>
              </div>
            </div>
          </div>


        </Col>
      </Row>
    </div>
  );
}
