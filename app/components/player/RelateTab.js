import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/Style';
import { Icon, Tabs, Tab } from 'react-native-elements';
import Information from './Information';
import Episodes from './Episodes';
import Relates from './Relates';
import Timelines from './Timelines';

let {width, height} = Dimensions.get('window');

export default class RelateTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataRelate: [],
      dataVideo: [],
      selectedTab: 'information',
      containerImageSize: {width: ((width/2) - 5), height: ((width/2)/16*9)}
    };
    this.renderBackButton = this.renderBackButton.bind(this);
  }

  componentWillMount() {
      this.setState({
        dataRelate: this.props.dataRelate,
        dataVideo: this.props.dataVideo
      })
  }

  changeTab (selectedTab) {
    this.setState({ selectedTab: selectedTab });
  }

  renderNavIconMenu() {
    return(
      <View style = { styles.NavIconMenu } >
        <Icon name = 'menu' color = 'white' onPress = { () => this.props.onMenuToogle() } />
      </View>
    )
  }
  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }
  renderBackButton() {
    return(
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.jumpBack()} />
      </View>
    )
  }
  renderNavIconSearch() {
    return(
      <View style={styles.iconSearch}>
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
          size={15}
          onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderBackButton()}
                                                        statusBar = {{ hidden: true }} style={styles.navigationBar} />
      })
  }

  render() {
    const selectedTab = this.state.selectedTab;

    return(
      <View>
          <Tabs tabBarStyle={[styles.tabsVideo, {width: width, top: width/16*9}]}>
              <Tab
                tabStyle={ [selectedTab === 'information' ? styles.tabSelectedstyle : styles.tabStyleVideo] }
                titleStyle={[styles.titleStyle]}
                selectedTitleStyle={ [styles.selectedTitleStyle] }
                selected={selectedTab === 'information'}
                title={'INFORMATION'}
                onPress={() => this.changeTab('information')}>
                <Information {...this.props.dataRelate} />
              </Tab>

              {
                this.props.dataRelate.episodes.length > 0 ?
                  <Tab
                    tabStyle={ [selectedTab === 'episodes' ? styles.tabSelectedstyle : styles.tabStyleVideo] }
                    titleStyle={[styles.titleStyle]}
                    selectedTitleStyle={[styles.selectedTitleStyle]}
                    selected={selectedTab === 'episodes'}
                    title={'EPISODES'}
                    onPress={() => this.changeTab('episodes')}>
                      <Episodes renderLogoNavBar={this.renderLogoNavBar} renderBackButton={this.renderBackButton} renderNavIconSearch={this.renderNavIconSearch}
                                episodes={this.props.dataRelate.episodes} navigator={this.props.navigator} />
                  </Tab>
                : null
              }

              {
                this.props.dataRelate.timelines.length > 0 ?
                  <Tab
                    tabStyle={ [selectedTab === 'timelines' ? styles.tabSelectedstyle : styles.tabStyleVideo] }
                    titleStyle={[styles.titleStyle]}
                    selectedTitleStyle={[styles.selectedTitleStyle]}
                    selected={selectedTab === 'timelines'}
                    title={'TIMELINES'}
                    onPress={() => this.changeTab('timelines')}>
                      <Timelines renderLogoNavBar={this.renderLogoNavBar} renderBackButton={this.renderBackButton} renderNavIconSearch={this.renderNavIconSearch}
                              timelines={this.props.dataRelate.timelines} navigator={this.props.navigator}
                              containerImageSize={this.state.containerImageSize} parentId={this.props.dataRelate.content.id} />
                  </Tab>
                : null
              }

              {
                this.props.dataRelate.related.length > 0 ?
                  <Tab
                    tabStyle={ [selectedTab === 'relates' ? styles.tabSelectedstyle : styles.tabStyleVideo] }
                    titleStyle={[styles.titleStyle]}
                    selectedTitleStyle={[styles.selectedTitleStyle]}
                    selected={selectedTab === 'relates'}
                    title={'RELATES'}
                    onPress={() => this.changeTab('relates')}>
                    <Relates renderLogoNavBar={this.renderLogoNavBar} renderBackButton={this.renderBackButton} renderNavIconSearch={this.renderNavIconSearch}
                              related={this.props.dataRelate.related} navigator={this.props.navigator} />
                  </Tab>
                : null
              }

            </Tabs>

        </View>
    )
  }
}
