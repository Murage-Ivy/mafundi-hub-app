import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultJobStyles } from '@/constants/styles'
import { FontAwesome5 } from '@expo/vector-icons'
import { Image } from 'expo-image'
import Search from '@/components/search'

const Handymen = () => {
    const handleChange = () => {
        console.log('searching...')
    }
    return (
        <View>

            <View style={defaultJobStyles.headerStyle}>
                <Image source={require('@/assets/images/placeholder.jpg')}
                    style={{ width: 50, height: 50, borderRadius: 50 }} />
                <Text>Plumbing</Text>
                <FontAwesome5
                    name="bell"
                    size={20}
                    color={Colors.secondary}
                />
            </View>

            <View>
                <Search handleChange={handleChange} placeholder='Search for Handyman' />
            </View>
            <View>
                <Text>Recommended</Text>
            </View>
        </View>
    )
}

const handymenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light
    }
})
export default Handymen