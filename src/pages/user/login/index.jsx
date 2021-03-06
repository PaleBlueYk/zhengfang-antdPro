import { Alert, Input, Tooltip } from 'antd';
import { QqOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { connect } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit, CaptCha } = LoginFrom;

@connect(({ login, global, loading }) => ({
  global,
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  state = {
    type: 'account',
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getToken',
    });
  }

  handleChangeCaptChaSrc = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeCaptChaSrc',
    });
  };

  setAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (values) => {
    const type = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    }).then((data) => {
      if(data.result === 'fail') {
        dispatch({
          type: 'global/changeCaptChaSrc',
        });
      }
    })
  };

  LoginMessage = (content) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { global, userLogin, submitting } = this.props;
    const { status, type: loginType, message } = userLogin;
    const { captChaSrc } = global;
    const { type } = this.state;

    return (
      <div className={styles.main}>
        <LoginFrom activeKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {status === 'fail' &&
              loginType === 'fail' &&
              !submitting &&
              this.LoginMessage(message || '奇怪的bug增加了,请联系作者QQ:917885215')}

            <UserName
              name="username"
              placeholder="学号"
              rules={[
                {
                  required: true,
                  message: '请输入学号!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              autoComplete="false"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Input.Group>
              <Tooltip title="点击切换验证码" placement="left">
                <img
                  className={styles.captcha}
                  onClick={this.handleChangeCaptChaSrc}
                  src={captChaSrc}
                  alt="验证码"
                />
              </Tooltip>
              <CaptCha
                name="captcha"
                placeholder="验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              />
            </Input.Group>
          </Tab>
          <div>
            <p>如果遇到无法访问之类的问题，请联系站长:<a href="tencent://Message/?Uin=917885215&amp;websiteName=q-zone.qq.com&amp;Menu=yes" ><QqOutlined spin /></a></p>
            <p>备用站点：<a href="http://zf.css0209.cn" target="_blank" rel="nofollow">正方镜像站点</a></p>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </LoginFrom>
      </div>
    );
  }
}

export default Login;
