import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, ListView, ScrollView } from 'react-native';
import { SearchBar, Tabs, Tab, Icon } from 'react-native-elements';
import Row from './RowSearch';
import styles from '../../styles/Style';

const {width} = Dimensions.get('window');
const AUTHORIZATION_URL = 'https://ottapi.com/v1.7/sbtn/index/generateauthorization?key=0tt@pi.C0m_Med1@&token=cab9f50230778df5c52b4ccb4d12d6ca';
const REQUEST_URL_SEARCH = 'https://ottapi.com/v1.7/sbtn/search';

export default class Search extends Component {

  constructor(props) {

    super(props);
    this.state = {
      textSearch: '',
      selectedTab: 'view',
      authorization: {},
      imageSize: null,
      containerImageSize: null,
      dataSearch: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
    };
  }

  componentWillMount() {
      this._generateAuthorization(AUTHORIZATION_URL).done();
  }

  async _generateAuthorization(url) {
    try {
      let response = await fetch(url, { method: 'GET' });
      let json = await response.json();
      this.setState({
        authorization: json
      });
    } catch(error) {
      console.error(error);
    }
  }

  async _fetchData(dataResponse, textSearch, selectedTab) {
      //console.log(dataResponse);
      if(textSearch && dataResponse) {
        let mode = selectedTab === 'view' ? 1 : 0;
        let url = REQUEST_URL_SEARCH + '?keyword='+textSearch+'&mode='+mode;
        let response = await fetch(url, {
                                    method: 'GET',
                                    headers: {
                                      'DateTime': dataResponse.DateTime,
                                      'RequestToken': dataResponse.RequestToken
                                    }
                                  });
        let responseJson = await response.json();
        const imageWidth = (width/2) - 5;
        const imageHeight = (width/2)/16*9;
        this.setState({
          dataSearch: this.state.dataSearch.cloneWithRows(responseJson[selectedTab]),
          imageSize: { width: imageWidth, height: imageHeight },
          containerImageSize: { width: imageWidth, height: imageHeight + 20},
        })
      }
  }

  bindSearchData(text) {
    this.setState({
      textSearch: text
    });
    if(this.state.textSearch) {
        this._fetchData(this.state.authorization, this.state.textSearch, this.state.selectedTab);
    }
  }

  changeTab (selectedTab) {
    this.setState({ selectedTab: selectedTab });
    if(this.state.textSearch) {
        this._fetchData(this.state.authorization, this.state.textSearch, selectedTab);
    }
  }

  _renderContent = (pageText: string) => {
    return (
      <View>
        <Text>{pageText}</Text>
      </View>
    );
  };

 renderRowItem(rowData) {
  return (
    <Row {...rowData} imageSize={this.state.imageSize} containerImageSize={this.state.containerImageSize} navigator={this.props.navigator} />
  )
 }

  render() {
    const selectedTab = this.state.selectedTab;

    return(
      <View style={styles.container}>
          <View style={[styles.row]}>
            <SearchBar
            lightTheme
            onChangeText={(text) => this.bindSearchData(text)}
            placeholder='Search...'
            value={this.state.textSearch}
            containerStyle={styles.searchBar} />
          </View>

          <View style={[styles.row]}>
            <Tabs tabBarStyle={styles.tabs}>
                <Tab
                  tabStyle={ selectedTab === 'view' ? styles.tabSelectedstyle : styles.tabStyle }
                  titleStyle={[styles.titleStyle]}
                  selectedTitleStyle={ [styles.selectedTitleStyle] }
                  selected={selectedTab === 'view'}
                  title={'View'}
                  onPress={() => this.changeTab('view')}>
                  {this._renderContent('View')}
                </Tab>
                <Tab
                  tabStyle={ selectedTab === 'listen' ? styles.tabSelectedstyle : styles.tabStyle }
                  titleStyle={[styles.titleStyle]}
                  selectedTitleStyle={[styles.selectedTitleStyle]}
                  selected={selectedTab === 'listen'}
                  title={'Listen'}
                  onPress={() => this.changeTab('listen')}>
                    {this._renderContent('Listen')}
                </Tab>
              </Tabs>
          </View>

          {
            this.state.textSearch ?
                <ListView
                  contentContainerStyle={styles.contentContainer}
                  enableEmptySections={true}
                  dataSource = {this.state.dataSearch}
                  renderRow = {this.renderRowItem.bind(this)}
              />
            : null
          }

      </View>
    )
  }
}
