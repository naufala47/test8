import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [userNama, setuserNama] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const [userPhone, setuserPhone] = useState(0)
    const [userAddress, setuserAddress] = useState("")
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         userNama: "",
    //         userEmail: "",
    //         userPhone: "",
    //         userAddress: "",

    //     }
    // }

    const postAPI = () => {
        axios.post('https://ujianekspres.herokuapp.com/users', {
            userNama: userNama,
            userEmail: userEmail,
            userPhone: userPhone,
            userAddress: userAddress
        })
            .then(function (response) {
                // handle success
                Alert.alert("Data Disimpan");
                navigation.navigate('List')
            })
            .catch(function (error) {
                // handle error
                Alert.alert("Data Gagal");
                navigation.navigate('List')
            });
    }

    // postAPI = () => {
    //     axios.post(`https://ujianekspres.herokuapp.com/users`)
    //         .then(response =>
    //             response.data.data.map(
    //                 itsdata => ({
    //                     userNama: `${itsdata.userNama}`,
    //                     userEmail: `${itsdata.userEmail}`,
    //                     userPhone: `${itsdata.userPhone}`,
    //                     userAddress: `${itsdata.userAddress}`
    //                 })
    //             )
    //         )

    //         .then(datas => {
    //             this.setState(
    //                 {
    //                     datas,
    //                     isLoading: false
    //                 },
    //                 console.log(datas)
    //             );
    //         })
    //         .catch(error => this.setState({ error, isLoading: false }));
    // }

    // render() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Register</Text> */}
            <TextInput
                style={styles.textInput}
                placeholder="nama"
                onChangeText={txtusernama => setuserNama(txtusernama)} />
            <TextInput
                style={styles.textInput}
                placeholder="email"
                onChangeText={txtuseremail => setuserEmail(txtuseremail)} />
            <TextInput
                style={styles.textInput}
                placeholder="phone"
                onChangeText={txtuserphone => setuserPhone(txtuserphone)} />
            <TextInput
                style={styles.textInput}
                placeholder="address"
                onChangeText={txtuseraddress => setuserAddress(txtuseraddress)} />
            <TouchableOpacity
                onPress={() => postAPI()}
                style={styles.button}>
                <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('List')}
                style={styles.button}>
                <Text style={styles.buttonTitle}>List</Text>
            </TouchableOpacity>
        </View>
    );
    // }
}

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
    button: {
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
    }
})

export default Register


