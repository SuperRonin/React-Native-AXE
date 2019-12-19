import React, { Component } from 'react';
import {
    StyleSheet,
    BackHandler,
    ToastAndroid
} from 'react-native';
import MywebPage from '../webview'

export default class FindPage extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }
    render() {
        return (
            <MywebPage style={{height: 100}} uri={'https://www.bus365.com/public/www/bus365vue4/nearby1/index.html#/'}></MywebPage>
        )
    }

    /**
     * 物理按键返回
     */
    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tips: {
        fontSize: 28
    }
});