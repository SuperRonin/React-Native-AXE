import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    ToastAndroid
} from 'react-native';

import MySwiper from '../component/swiper';


export default class HomePage extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props.navigation;
    }
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
            <ScrollView>
                <Text style={styles.title}>swiper</Text>
                <MySwiper _swpierHref={this._swpierHref.bind(this)}></MySwiper>

                <Text style={styles.title}>Navigation</Text>
                <TouchableOpacity onPress={() => { this._pressButton(1) }}>
                    <View style={styles.place}><Text style={styles.placeWord}>Tab跳转（TouchableOpacity）</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this._pressButton(0) }}>
                    <View style={styles.place}><Text style={styles.placeWord}>普通Page跳转（TouchableOpacity）</Text></View>
                </TouchableOpacity>

                <Text style={styles.title}>Page List</Text>
                <TouchableOpacity onPress={() => { this._pressButton(2) }}>
                    <View style={styles.place}><Text style={styles.placeWord}>scrollView</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this._pressButton(3) }}>
                    <View style={styles.place}><Text style={styles.placeWord}>sectionList</Text></View>
                </TouchableOpacity>

                <View style={styles.menu}>
                    <View style={styles.menuItem}><Text style={styles.white} onPress={() => this._hrefWeb()}>定制专线</Text></View>
                    <View style={styles.menuItem}><Text style={styles.white}>城际拼车</Text></View>
                    <View style={styles.menuItem}><Text style={styles.white}>定制包车</Text></View>
                    <View style={styles.menuItem}><Text style={styles.white}>火车票</Text></View>
                    <View style={styles.menuItem}><Text style={styles.white}>校园巴士</Text></View>
                    <View style={styles.menuItem}><Text style={styles.white}>机场巴士</Text></View>
                </View>
            </ScrollView>

        )

    }
    _hrefWeb(){
        this.props.navigation.push('Myweb', { link: 'https://wwwt.bus365.cn/public/www/bus365vue4/nearby1/index.html#/?fromto=android&longitude=116.301965&latitude=40.054559&toppadding=20&id=220100000000&findname=北京市&netaddress=1.1.1.1&netname=jl.bus365.com&departtype=undefined&token=%7B"clienttype"%3A"android","version"%3A"5.3.5.test1","clienttoken"%3A"","devicetoken"%3A"AsEhStKgRVcT0KkijIWn4DbrIpNzFj2ij9c43LQKu7Kc"%7D' })
    }
    /**
     * 出发地点击
     */
    _pressButton(pageType) {
        switch (pageType) {
            case 0:
                this.props.navigation.push('Twoleve')
                break;
            case 1:
                this.props.navigation.navigate('Find')
                break;
            case 2:
                this.props.navigation.push('Scroll')
                break;
            case 3:
                this.props.navigation.push('section')
                break;
        }
    }
    /**
     * 轮播跳转
     */
    _swpierHref(link) {
        if (link) this.props.navigation.push('Myweb', { link })
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
// 获取屏幕宽高
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    place: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'

    },
    placeWord: {
        width,
        fontSize: 16,
        color: '#999',
        textAlign: 'left',
        paddingLeft: 10
    },
    date: {
        width,
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 5,
    },

    white: {
        color: '#fff',
        lineHeight: 50,
        textAlign: 'center',
        fontSize: 16
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    menuItem: {
        width: 170,
        height: 50,
        textAlign: 'center',
        backgroundColor: 'orange',
        marginLeft: 1,
        marginBottom: 1
    }
})