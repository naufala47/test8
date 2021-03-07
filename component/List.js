import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            dpData: 'userEmail',
            datas: [],
            isLoading: true,
            errors: null,
            url: 'https://ujianekspres.herokuapp.com/users/',
            cari: 0,
            lstCari: ["userEmail", "userPhone", "userAddress"],
            list: [
                { label: 'Email', value: 'userEmail', icon: () => <Icon name="flag" size={18} color="#900" /> },
                { label: 'Phone', value: 'userPhone', icon: () => <Icon name="flag" size={18} color="#900" /> },
                { label: 'Address', value: 'userAddress', icon: () => <Icon name="flag" size={18} color="#900" /> },
            ]

        };
    }

    getAPIsearch = () => {
        // console.log(this.state.cari);
        let nyari = this.state.url + this.state.cari + "/" + this.state.keyword
        if (this.state.keyword == "") {
            nyari = this.state.url;
        }
        console.log(nyari);
        axios.get(nyari)
            .then(response =>
                response.data.data.map(
                    itsdata => ({
                        userNama: `${itsdata.userNama}`,
                        userEmail: `${itsdata.userEmail}`,
                        userPhone: `${itsdata.userPhone}`,
                        userAddress: `${itsdata.userAddress}`
                    })
                )
            )

            .then(datas => {
                this.setState(
                    {
                        datas,
                        isLoading: false
                    },
                    console.log(datas)
                );
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    getAPI = () => {
        axios.get(this.state.url)
            .then(response =>
                response.data.data.map(
                    itsdata => ({
                        userNama: `${itsdata.userNama}`,
                        userEmail: `${itsdata.userEmail}`,
                        userPhone: `${itsdata.userPhone}`,
                        userAddress: `${itsdata.userAddress}`
                    })
                )
            )

            .then(datas => {
                this.setState(
                    {
                        datas,
                        isLoading: false
                    },
                    console.log(datas)
                );
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    renderSparo = (item) => {
        return (
            <FlatList
                data={this.state.datas}
                renderItem={({ item }) =>
                    <View style={styles.itemContainer}>
                        <View>
                            <Text style={styles.teks}>Name : {item.userNama}</Text>
                            <Text style={styles.teks}>Phone : {item.userPhone}</Text>
                            <Text style={styles.teks}>Email : {item.userEmail}</Text>
                            <Text style={styles.teks}>Address : {item.userAddress}</Text>
                        </View>
                    </View>
                }
            />
        )
    }

    componentDidMount() {
        this.getAPIsearch();
        setInterval(this.getAPIsearch, 2000);
        console.log(this.getAPIsearch());
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>

                    <View>
                        {/* <Text style={styles.title}>List </Text> */}
                        <Text style={{
                            marginLeft: 30,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: "bold"
                        }}>Search By :</Text>
                        <DropDownPicker
                            items={this.state.list}
                            defaultValue={this.state.dpData}
                            containerStyle={{ height: 40, width: 300, marginLeft: 30 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                cari: item.value
                            })}

                        />
                        {/* {this.state.list.map(this.renderSparo)} */}
                        <Text style={{
                            marginLeft: 30,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        >Keyword :</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="masukkan keyword"
                            onChangeText={(keyword) => this.setState({ keyword: keyword })} />
                        <View>
                            <TouchableOpacity
                                onPress={() => this.getAPIsearch()}
                                style={styles.buttonStyle}>
                                <Text style={styles.buttonTitle}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Button
                            title="search"
                            onPress={() => this.getAPIsearch()}
                        >
                        </Button> */}
                        {this.renderSparo()}
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Register')}
                                style={styles.buttonStyle}>
                                <Text style={styles.buttonTitle}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    buttonStyle: {
        backgroundColor: '#00345e',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold"
    },
    itemContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        backgroundColor: '#d4d4d6',
        paddingLeft: 10,
        height: 70,
    },
    teks: {
        fontSize: 12,
        fontWeight: "bold"
    },
})
