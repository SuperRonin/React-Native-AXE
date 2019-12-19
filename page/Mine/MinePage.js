import React, { Component } from 'react';
import {
    View,
    Text,
    BackHandler,
    StyleSheet,
    ToastAndroid
} from 'react-native';

export default class MinePage extends Component {
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
            <View style={styles.container}>
                <Text>这是个人中心</Text>
            </View>
        );
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
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});