import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, RefreshControl, TouchableOpacity } from 'react-native'

export default class MyScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemList: [],
            evenNums: [],
            refreshing: false,
            showBackTop: false
        }
    }
    /**
     * 生命周期
     */
    componentDidMount() {
        this._makeData();
    }
    /**
     * 下拉刷新
     */
    _onRefresh = () => {
        this.setState({ refreshing: true, itemList: [] });
        setTimeout(() => {
            this._makeData();
        }, 500)
    }
    /**
     * 生成数据
     */
    _makeData = () => {
        let itemList = [];
        let evenNums = [];
        let i = 0;
        while (i <= 30) {
            itemList.push(
                <View style={styles.item} key={i}>
                    <Text style={i % 8 == 0 ? styles.itemTitle : styles.words}>
                        {i % 8 == 0 ? `标题${i}` : `I'm a item at ${i}`}
                    </Text>
                </View>)
            if (i % 8 == 0) evenNums.push(i)
            i++
        }
        this.setState({ itemList, evenNums, refreshing: false, })

    }
    _onViewScroll = (event) => {
        if (event.nativeEvent.contentOffset.y >= 300) {
            this.setState({
                showBackTop: true
            })
        } else {
            this.setState({
                showBackTop: false
            })
        }


        var offsetY = event.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; //scrollView高度
        console.log(offsetY + oriageScrollHeight, '----------------')
        console.log(contentSizeHeight, '----------------')
        if ( Math.floor((offsetY + oriageScrollHeight) * 100) / 100 >= Math.floor(contentSizeHeight * 100) / 100 ){
            setTimeout(() => {
                this._addItemList()
            },500)
        }

    }
    // 开始下拉刷新
    _addItemList = () => {
        let datalist = this.state.itemList;
        let evenNums =this.state.evenNums;
        let i = 31;
        while(i < 50){
            datalist.push(<View style={styles.item}>
                <Text style={i % 8 == 0 ? styles.itemTitle : styles.words} key={i}>
                    {i % 8 == 0 ? `标题${i}` : `I'm a item at ${i}`}
                </Text>
            </View>)
            if (i % 8 == 0) evenNums.push(i)
            i++
        }
        this.setState({
            itemList: datalist,
            evenNums
        })
    };

    _backTop = () => {
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    contentContainerStyle={styles.contentContainer}
                    stickyHeaderIndices={this.state.evenNums}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    scrollEventThrottle={10}
                    scrollsToTop={true}
                    scrollEnd={this.handleRefreshBegin}
                    onScroll={this._onViewScroll}
                >
                    {this.state.itemList}
                    <View><Text style={styles.loadMore}>正在加载...</Text></View>
                </ScrollView>
                {this.state.showBackTop ? (<TouchableOpacity style={styles.backTop} onPress={() => { this._backTop() }}>
                    <View><Text>返回顶部</Text></View>
                </TouchableOpacity>) : (null)}
            </View>
        )
    }
}

// 获取屏幕宽高
var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    backTop: {
        width: 60,
        height: 60,
        position: 'absolute',
        right: 10,
        bottom: 10,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        borderRadius: 50,
        backgroundColor: 'pink',
    },
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#ececec',
    },
    contentContainer: {
        zIndex: 888,
        width,
        backgroundColor: '#eee',
    },
    item: {
        color: '#999',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#eee'
    },
    itemTitle: {
        height: 40,
        lineHeight: 40,
        fontSize: 22,
        backgroundColor: '#ccc'
    },
    words: {
        fontSize: 20,
    },
    loadMore: {
        width,
        textAlign: "center",
        fontSize: 24,
        color: "orange"
    }

})