import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./APIConfig.scss"

import { Button, Col, Form, InputGroup, Layout, Row } from "@douyinfe/semi-ui"
import SvgLogo from "./SvgLogo";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import BackendList from "./BackendList";
import { UseGlobalStore } from "@app/store/app";
import { backendAuth } from "@app/api/connect";

const defaultURL = 'http://127.0.0.1:8081'

const APIConfig: FC = () => {
    const { Header, Content } = Layout
    const [baseURL, setBaseURL] = useState('');
    const [token, setToken] = useState('');
    const verifyHandler = async (value: any) => {
        let errors = {} as any
        let _baseURL: string = baseURL ? baseURL : defaultURL;
        try {
            new URL(_baseURL);
        } catch (e) {
            if (_baseURL) {
                const prefix = _baseURL.substring(0, 7);
                if (prefix !== 'http://' && prefix !== 'https:/') {
                    errors.baseURL = 'Must starts with http:// or https://'
                }
            } else {
                errors.baseURL = 'Invalid URL'
            }
            return errors
        }
        try {
            const res = await backendAuth({ baseURL: _baseURL, token })
        } catch (e) {
            errors.baseURL = 'Failed to connect'
            return errors
        }
        return ""
    }
    const submitHandler = () => {
        UseGlobalStore.getState().addApiConfig({ baseURL: `${baseURL ? baseURL : defaultURL}`, token })
    }
    return (
        <>
            <Layout className="apiconfig-layout apiconfig-flex">
                <Header className="apiconfig-flex">
                    <SvgLogo height={160} width={160} />
                    <Form
                        validateFields={verifyHandler}
                        onSubmit={submitHandler}
                    >
                        <Row>
                            <Col span={16}>
                                <Form.Input
                                    onChange={setBaseURL}
                                    field="baseURL" label="API Base URL" style={{ width: 320 }}
                                    placeholder={"http://127.0.0.1:8081"}
                                ></Form.Input>
                            </Col>
                            <Col span={8}>
                                <Form.Input
                                    onChange={setToken}
                                    field="token" label="Token(optional)" mode="password"></Form.Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="apiconfig-button-flex">
                                    <Button htmlType="submit">add</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Header>
                <Content>
                    <BackendList />
                </Content>
            </Layout>

        </>





    )
}

export default APIConfig;