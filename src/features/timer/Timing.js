import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RoundedButton from '../../components/RoundedButton'
import { paddingSizes } from '../../utils/sizes'

export default function Timing({onChangeTime}) {
    return (
        <>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="1" onPress={() => onChangeTime(1)}/>
            </View>
            <View style={{marginHorizontal : 10}}>

            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)}/>
            </View>
            <View style={{marginHorizontal : 10}}>

            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)}/>
            </View>
            <View style={{marginHorizontal : 10}}>

            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} title="30" onPress={() => onChangeTime(30)}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    timingButton : {
        flex : 1,
        alignItems : 'center',
        
    }
})
