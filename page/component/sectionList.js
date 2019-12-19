import React, { Component } from 'react'
import { Text, View, SectionList, FlatList, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from 'react-native'

const { width, height } = Dimensions.get('window');

export default class MySctionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            sections: [],
            isTouchDown: false,
            letterWord: 'A', //放大的字母
            isShowLetterTips: false,
            letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        }
    }
    componentDidMount() {
        this._mockData();
    }
    render() {
        const top_offset = (Dimensions.get('window').height - this.state.letterArr.length * 20 - 56 - 44 - 24) / 2;
        const letterArr = this.state.letterArr;
        return (
            <View contentContainerStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <SectionList
                    ref="_sectionList"
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this._refresh() }}
                    renderItem={({ item, index, section }) => <Text key={index} style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontWeight: "bold" }, styles.itemTitle}>{title}</Text>
                    )}
                    onScrollToIndexFailed={ () => { this._onScrollToIndexFailed() } }
                    sections={this.state.sections}
                    keyExtractor={(item, index) => item + index}
                    ListFooterComponent={() => this.state.sections.length ? <Text style={styles.loadMore}>我是有底线的</Text> : <Text></Text>}
                    ListEmptyComponent={() => <Text style={styles.loadingTips}>加载中~~</Text>}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => { this._onEndReached() }}

                />


                <View style={{ position: 'absolute', width: 26, right: 0, top: top_offset }}
                    ref="sectionItemView"
                    onStartShouldSetResponder={() => true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
                    onMoveShouldSetResponder={() => true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
                    onResponderGrant={(e) => this._responderGrant(e)} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
                    onResponderMove={(e) => this._responderMove(e)} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
                    onResponderRelease={(e) => this._responderRelease(e)} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
                    stickySectionHeadersEnabled={true}
                    getItemLayout={(letterArr, index) => {
                        return {
                            index: index,
                            offset: 150 * (index - (index % 5 == 0 ? 0 : 1) - parseInt(index / 5))
                                + 25 * (parseInt(index / 5) + (index % 5 == 0 ? 0 : 1)),
                            length: index % 5 == 0 ? 25 : 150,
                        }
                    }}
                >
                    {
                        this.state.letterArr.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={{ marginVertical: 2, height: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this._onSectionSelect(index) }}
                                >
                                    <Text>{item.toUpperCase()}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {this.state.isShowLetterTips ? <View style={styles.showLetter}><Text style={styles.showLetterSize}>{this.state.letterWord}</Text></View> : <Text></Text>}
            </View>
        )

    }
    /*用户手指开始触摸*/
    _responderGrant(event) {
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    }

    /**
     * 用户手指在屏幕上移动手指，没有停下也没有离开
     * @param {*} event 
     */
    _responderMove(event) {
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    }
    /**
     * 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
     * @param {*} event 
     */
    _responderRelease(event) {
        this.hideLetterTips();
    }
    /**
     * 快捷字母点击
     * @param {Number} key 当前字母索引
     */
    _onSectionSelect(key) {
        let offset = key * 20;      //点击了那个字母索引，没有section的header的高是20;key为0是即偏移0
        const { sections } = this.state;
        sections.map((item, index) => {
            if (key > index) {        //要滚动的距离就是，点击的字母索引之前的所有内容，所以当 点击字母的索引 大于 sections（变量）的索引时；技术要滚动的高度
                offset = offset + item.data.length * 80 + (item.data.length - 1);      //每个联系人的item高是60，上下padding各为10;然后每个节点里面有length-1条分割线且高度为1
            }
        });
        //滚动到指定的偏移的位置
        this.refs._sectionList.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: key });
        console.log('------------', key)
        this.setState({
            isShowLetterTips: true,
            letterWord: this.state.letterArr[key * 1]
        })
        this.hideLetterTips();
    }
    _refresh = () => {
        this.setState({
            sections: [],
            refreshing: true
        });

        const that = this;
        setTimeout(() => {
            this._mockData();
            that.setState({
                refreshing: false,
            });
        }, 500);
    }
    _mockData = () => {
        let sections = this.state.sections;
        let i = 0;
        while (i < 26) {
            sections.push({ title: `Title${this.state.letterArr[i]}`, data: ["item1", "item2", "item3", "item4", "item5", "item6"] })
            i++
        }
        this.setState({
            sections
        })
    }
    _onEndReached = () => {
        ToastAndroid.show('滚动到底部啦！！！', ToastAndroid.SHORT);
    }
    /**
     * 监听快捷字母跳转失败
     * @param {*} event 
     */
    _onScrollToIndexFailed () {
        ToastAndroid.show('获取外部渲染区的位置失败！！！', ToastAndroid.SHORT);
    }
    /*手指滑动，触发事件*/
    scrollSectionList(event) {
        const statusHeight = 20;
        const sectionTopBottomHeight = 200;
        const sectionItemHeight = (height - statusHeight - sectionTopBottomHeight * 2) / this.state.letterArr.length;
        const touch = event.nativeEvent.touches[0];

        // 手指滑动范围 从 A-Q  范围从50 到 50 + sectionItemHeight * cities.length
        if (touch.pageY - statusHeight >= sectionTopBottomHeight && touch.pageY <= statusHeight + sectionTopBottomHeight + sectionItemHeight * this.state.letterArr.length) {

            //touch.pageY 从顶部开始，包括导航条 iOS 如此，如果是android 则具体判断
            const index = (touch.pageY - statusHeight - sectionTopBottomHeight) / sectionItemHeight;

            this.setState({
                isShowLetterTips: true,
                letterWord: this.state.letterArr[parseInt(index)]
            })

            // 默认跳转到 第 index 个section  的第 1 个 item
            this.refs._sectionList.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: parseInt(index) });

        }
    }
    hideLetterTips() {
        setTimeout(() => {
            this.setState({
                isShowLetterTips: false
            })
        }, 1000);
    }
}

const styles = StyleSheet.create({
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
    loadMore: {
        textAlign: "center",
        fontSize: 24,
        color: "orange"
    },
    loadingTips: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        color: '#666',
        textAlign: 'center',
        marginTop: '50%'
    },
    showLetter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: Math.floor(width / 6),
        height: Math.floor(width / 6),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0, .5)",
        marginLeft: -Math.floor(width / 6) / 2,
        marginTop: -Math.floor(width / 6) / 2
    },
    showLetterSize: {
        fontSize: 35,
        color: '#fff'
    }
})