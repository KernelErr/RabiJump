import * as React from "react"
import { Button, Col, Form, Input, Row } from "@douyinfe/semi-ui"
import { BasicLinkProps, LinkProps } from "@app/type/link"
import { BaseFormProps } from "@douyinfe/semi-ui/lib/es/form"
import { t } from "i18next"
import { trans_key } from "@app/i18n/resources"

import "./LinkForm.scss"

const statusCode = [
    [301, 301],
    [302, 302],
    [307, 307],
    [308, 308]
]

interface LinkFormProps extends BaseFormProps {
    linkData: LinkProps
    index?: number
    onSubmitHandler: (data: LinkProps, idx: number) => void
    update?: boolean
}

const LinkForm = React.memo(function LinkForm({
    linkData,
    index,
    onSubmitHandler,
    update,
}: LinkFormProps) {
    const { Input, Checkbox, Select, TextArea } = Form
    return (
        <Form allowEmpty onSubmit={(v) =>
            onSubmitHandler(v as LinkProps, index as number)
        }
            labelPosition="left" labelAlign="left" labelWidth={"90px"}>
            <Input disabled={update} field="name" initValue={linkData.name}
                rules={[{ required: true, message: "Required" }]}
                label={t(trans_key["Links.name"]) as string}></Input>
            <Input field="target" initValue={linkData.target} placeholder={"http(s)://example.org"}
                rules={[{ required: true, message: "Required" }]}
                label={t(trans_key["Links.target"]) as string}></Input>
            <Input field="mobile_target" initValue={linkData.mobile_target} placeholder={"http(s)://example.org"}
                label={t(trans_key["Links.mobile_target"]) as string}></Input>
            <TextArea field="desc" initValue={linkData.desc}
                label={t(trans_key["Links.description"]) as string}></TextArea>
            <Checkbox field="allow_parameters" initValue={linkData.allow_parameters}
                label={t(trans_key["Links.parameters"]) as string} />
            <Checkbox field="active" initValue={linkData.active}
                label={t(trans_key["Links.active"]) as string} />
            <Select field="status_code" initValue={linkData.status_code}
                label={t(trans_key["Links.status_code"]) as string}
                placeholder={'Default 302'}
            >
                {statusCode.map(([value, label]) =>
                    <Select.Option key={label} value={value} label={label}></Select.Option>
                )}
            </Select>
            <Row>
                <Col>
                    <div className="linkcard-button-wrapper">
                        <Button htmlType="submit"
                            block={!update}
                        >{update
                            ? t(trans_key.update) as string
                            : t(trans_key.create) as string
                            }
                        </Button>
                    </div>
                </Col>
            </Row>

        </Form>
    )
})

export default LinkForm