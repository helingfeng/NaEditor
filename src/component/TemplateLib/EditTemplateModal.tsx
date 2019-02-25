import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;
const { Search, TextArea } = Input;

import INTERFACE from '../../common/script/INTERFACE';
import { EditType } from './interface';
import { IModuleType } from '../interface';

interface TemplateFormProps extends FormComponentProps {}

interface ITemplateFormState {
  moduleList: IModuleType[];
}

class TemplateForm extends React.Component<
  TemplateFormProps,
  ITemplateFormState
> {
  constructor(props: TemplateFormProps) {
    super(props);
    this.state = {
      moduleList: [],
    };
  }

  async componentDidMount() {
    const result = (await axios(INTERFACE.getModuleList)).data;
    if (result.success === true) {
      const moduleList = result.data.reduce((acc: IModuleType[], v: any) => {
        (v.list as any).map((v: IModuleType) => {
          acc.push(v);
        });
        return acc;
      }, []);
      this.setState({
        moduleList,
      });
    }
  }

  handleSubmit = () => {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          const result = await axios({
            url: INTERFACE.updateTemplate,
            data: values,
            method: 'post',
          });
          if (!result.data.success) {
            message.error(result.data.msg);
          }
          resolve(result);
        }
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { moduleList } = this.state;
    return (
      <Form>
        <FormItem label="模板名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入模板名称' }],
          })(<Input placeholder="模板名称" />)}
        </FormItem>
        <FormItem label="模块类型">
          {getFieldDecorator('moduleType', {
            rules: [{ required: true, message: '请输入模块类型' }],
          })(
            <Select placeholder="选择模块类型">
              {moduleList
                ? moduleList.map((v: IModuleType) => (
                    <Option key={v.id + ''} value={v.moduleTypeId}>
                      {v.moduleName}
                    </Option>
                  ))
                : null}
            </Select>,
          )}
        </FormItem>
        <FormItem label="模板类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请输入模板类型' }],
          })(
            <Select placeholder="选择模板类型">
              <Option value={0}>系统模板</Option>
              <Option value={1}>自定义模板</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="模板图片url">
          {getFieldDecorator('imgUrl', {})(
            <Input placeholder="请输入模板图片url" />,
          )}
        </FormItem>
        <FormItem label="模板内容">
          {getFieldDecorator('template', {})(
            <TextArea placeholder="请输入模板内容" />,
          )}
        </FormItem>
        <FormItem label="模板样式">
          {getFieldDecorator('style', {})(
            <TextArea placeholder="请输入模板样式" />,
          )}
        </FormItem>
        <FormItem label="id" style={{ display: 'none' }}>
          {getFieldDecorator('id', {})(<Input placeholder="id" />)}
        </FormItem>
      </Form>
    );
  }
}

const TemplateFormWrap = Form.create()(TemplateForm);

interface EditTemplateModalProps {
  visible: boolean;
  editType: EditType;
  templateId: number | undefined;
  onCancel: () => void;
  onOk: () => void;
}

interface EditTemplateState {
  shouldFetch: boolean; // 是否需要拉取模板信息
}

class EditTemplateModal extends React.Component<
  EditTemplateModalProps,
  EditTemplateState
> {
  // static getDerivedStateFromProps(nextProps: EditTemplateModalProps, prevState: EditTemplateState) {
  //     if (nextProps.templateId) {
  //         return {
  //             shouldFetch: true,
  //         };
  //     } else {
  //         return {
  //             shouldFetch: false,
  //         };
  //     }
  // }

  form: any = {};

  constructor(props: EditTemplateModalProps) {
    super(props);
    this.state = {
      shouldFetch: false,
    };
  }

  componentDidMount() {
    const { editType, templateId } = this.props;
    // 如果是编辑状态，要去调接口回显
    if (editType === EditType.Edit && templateId) {
      this.fetchTemplateInfo(templateId);
    }
  }

  async fetchTemplateInfo(templateId: number) {
    const result = (await axios(INTERFACE.getTemplateInfo, {
      params: {
        id: templateId,
      },
    })).data;
    if (result.success) {
      const { data } = result;
      this.form.props.form.setFieldsValue(data);
    }
  }

  handleSubmit = async () => {
    const result = (await this.form.handleSubmit()).data;
    if (result.success) {
      this.props.onOk();
    }
  };

  handleOk = () => {
    this.handleSubmit();
  };

  // componentDidUpdate() {
  //     const { shouldFetch } = this.state;
  //     const { visible, templateId } = this.props;
  //     if (shouldFetch && visible && templateId) {
  //         this.fetchTemplateInfo(templateId);
  //     }
  // }

  render() {
    const { visible, editType } = this.props;
    const { shouldFetch } = this.state;
    return (
      <Modal
        visible={visible}
        onCancel={() => {
          this.props.onCancel();
        }}
        title={
          <span className="d-title">{`${
            editType === EditType.Add ? '新增模板' : '编辑模板'
          }`}</span>
        }
        width={800}
        onOk={this.handleOk}
      >
        <TemplateFormWrap
          wrappedComponentRef={(form: any) => {
            this.form = form;
          }}
        />
      </Modal>
    );
  }
}

export default EditTemplateModal;
