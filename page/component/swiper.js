import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import FitImage from 'react-native-fit-image';
import HttpUtils from '../../tools/fetch'

export default class SwiperComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recommandData: ''
    }
    this.getRecommand = this.getRecommand.bind(this);
  }
  /**
   * 生命周期DOM挂载
   */
  componentDidMount() {
    this.getRecommand();
  }
  render() {
    if (!this.state.recommandData) return this.renderLoadingView();

    return this.renderSwiper(this.state.recommandData.recommendterms[0].recommenddetails);
  }
  /**
   * 默认轮播
   */
  renderLoadingView() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.swiperDefaultContainer}>
          <FitImage resizeMode='stretch' style={styles.fitImageWithSize} source={{ uri: 'https://mraw.bus365.cn/public/www/images/errorimg.png' }} />
        </View>
      </View>
    );
  }
  /**
   * 真实数据
   */
  renderSwiper(swiperList) {
    return (
      <View height={150}>
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}
          dot={<View style={styles.swiperDot} />}
          activeDot={<View style={{ backgroundColor: '#fff', width: 18, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3 }} />}
          paginationStyle={{ bottom: 10 }}
        >
          {
            swiperList.map((item, index) => {
              return (
                <TouchableOpacity style={styles.fitImageWithSize} onPress={() => this.props._swpierHref(item.outlink)} key={item}>
                  <View style={styles.slide} key={item} >
                    <FitImage resizeMode='stretch' style={styles.fitImageWithSize} source={{ uri: item.picurl }} />
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </Swiper>
      </View>
    );
  }
  /**
 * 获取轮播图数据
 */
  getRecommand() {
    // return new Promise
    const that = this;
    HttpUtils.getRequest('/recommendterms0', { repositioncode: 'App-Home-Top-Circular-New', token: '%7B%22clienttype%22%3A%22ios%22%2C%22ordertoken%22%3A%22%22%2C%22clienttoken%22%3A%2285FA35717880025F9DD1DA572BE0791430641A129C4FA2365FBD2CAD21056AA6179C36F2A33D6DE720E4F6AB65D1D00D79AE7F6444405C5C0BB65777290F7061F9F7AD2DF578F6EF86684E8DA7A68A54%22%2C%22version%22%3A%225.3.0%22%7D' })
      .then((res) => {
        that.setState({
          recommandData: res
        })
      })
  }
}


// 样式片段
const styles = StyleSheet.create({
  swiperDefaultContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  swiperDefaultText: {
    fontSize: 22,
    color: '#ccc'
  },
  swiperDot: {
    backgroundColor: 'rgba(255, 255, 255, .8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3
  },
  fitImage: {
    borderRadius: 20,
  },
  fitImageWithSize: {
    height: 150,
    width: '100%',
  },
  wrapper: {
    height: 150
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})


