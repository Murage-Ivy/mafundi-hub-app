import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { HandymanProps } from '@/types/handyman'
import Colors from '@/constants/Colors'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import Reviews from '@/components/reviews'
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'
import Loader from '@/components/loader'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { setItemAsync } from 'expo-secure-store'

const Handyman = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { authState, userState } = useAuth()
    const [loading, setLoading] = useState(false)
    const [handyman, setHandyman] = useState<HandymanProps>({} as HandymanProps)
    const { setHandymanId, handymanId, proposal_status } = useHandymanId()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const getHandyman = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/handymen/${id}/show`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()
                setHandyman({ ...data, location_attributes: `${data.location?.city}, ${data.location?.county} ` })
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoading(false)
            }
        }
        getHandyman()
    }, [])

    const handymanSkills = handyman.handyman_skills?.map((skill: string) => {
        return (
            <View key={skill} style={styles.handymanSkillContainer}>
                <Text style={styles.handymanSkillText}>{skill}</Text>
            </View>
        )
    })

    const workPictures = handyman.media_url?.map((picture: string, index) => {
        return (
            <View key={index} style={styles.mediaContainer}>
                <Image source={{ uri: picture }} style={styles.mediaImage} contentFit='cover' />
            </View>
        )
    })

    const chatExists = async () => {
        try {
            setLoading(true)
            if (userState?.user_role === "client") {
                const chatRef = collection(FIREBASE_DB, 'messages')
                const q = query(chatRef, where('handyman', '==', handymanId), where('client', '==', userState?.user_id?.toString()))
                const result = await getDocs(q)
                if (result.empty) {
                    return false
                }
                return true
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    const createNewChat = async () => {
        const exist = await chatExists()
        if (exist) {
            return
        }
        try {
            setLoading(true)
            if (userState?.user_role === "client") {
                let id = `${Date.now()}`
                const _doc = {
                    id: id,
                    handyman: handymanId,
                    client: userState?.user_id?.toString(),
                    createdAt: serverTimestamp()
                }
                const docRef = await addDoc(collection(FIREBASE_DB, 'messages'), _doc)
                await setItemAsync('docRefId', docRef.id)
                userState.user_role === 'client' && await setItemAsync('client_id', JSON.stringify(userState?.user_id))
                setLoading(false)
            }
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <SafeAreaView style={styles.safeView}>
                <Octicons name='arrow-left' size={20} color={Colors.lighter} style={{ paddingHorizontal: 12, }} onPress={() => router.back()} />
                <View style={styles.containerHeader}>
                    <Image source={{ uri: handyman?.avatar_url }} placeholder={require('@/assets/images/placeholder.jpg')} placeholderContentFit='cover' style={styles.profileStyle} />
                    <Octicons name="dot-fill" size={24} color={handyman.availability ? 'green' : 'red'} style={styles.iconStyle} />
                </View>
                <ScrollView style={styles.scrollView} >
                    <View style={styles.conatiner}>

                        <View style={styles.subConatiner}>
                            <View style={styles.nameConatiner}>
                                <Text style={styles.nameText}>{handyman.first_name} {handyman.last_name}</Text>
                                <Text style={styles.titleText}>{handyman.title}</Text>
                                <Text style={styles.titleText}>{handyman.location_attributes}</Text>
                            </View>

                            <Pressable
                                // disabled={proposal_status === null}
                                style={[styles.appointmentBtn, proposal_status === null && { backgroundColor: '#a5c9ca' }]} onPress={() => {
                                    setHandymanId(handyman.id.toString())
                                    if (proposal_status) {
                                        router.push(`/appointment-form`)
                                    }
                                    else {
                                        createNewChat()
                                        router.push('/(auth)/(tabs)/messages')
                                    }
                                }}>
                                <Text style={styles.appointmentTextStyle}>{proposal_status  ? "Book Appointment" : "Send a message"}</Text>
                            </Pressable>

                            <ScrollView horizontal contentContainerStyle={{ marginTop: 10, }}>
                                {handymanSkills}
                            </ScrollView>

                            <View style={styles.bioContainer}>
                                <Text style={styles.bioHeader}>Bio</Text>
                                <Text style={styles.bioDescription}>{handyman.description}</Text>
                            </View>

                            <Text style={styles.imageHeader}>Images</Text>

                            <ScrollView horizontal={true} style={{ width: '100%', alignSelf: 'flex-start', }} contentContainerStyle={styles.imageScroll}>
                                {workPictures}
                            </ScrollView>

                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Text style={{ fontFamily: 'roboto-bold', letterSpacing: 1.2, fontSize: 14, padding: 10 }}>Reviews</Text>
                                    <Menu>
                                        <MenuTrigger
                                            style={{
                                                padding: 5,
                                                paddingHorizontal: 10
                                            }}>
                                            <Ionicons name="ellipsis-vertical" size={18} color="gray" />
                                        </MenuTrigger>
                                        <MenuOptions customStyles={
                                            {
                                                optionsContainer: {
                                                    backgroundColor: 'white',
                                                    padding: 5,
                                                    borderRadius: 5,
                                                    width: 100,
                                                }
                                            }
                                        }>
                                            <MenuOption style={{ width: 100, }} onSelect={() => {
                                                setVisible(true);
                                            }}>
                                                <Text style={{
                                                    padding: 5,
                                                    paddingHorizontal: 10,
                                                    fontFamily: 'roboto-bold'
                                                }} >Add Review</Text>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>
                                </View>
                                <Reviews {...{ id, setVisible, visible }} />
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </SafeAreaView>
            <Loader isLoading={loading} />
        </>
    )
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: Colors.primary,
    },

    scrollView: {
        width: '100%',
        height: '100%',
        marginTop: 60,
        paddingHorizontal: 10,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    containerHeader: {
        width: '100%',
        alignItems: 'center',
        top: 70,
        zIndex: 1,
    },
    conatiner: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    subConatiner: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    nameConatiner: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    nameText: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        paddingVertical: 5
    },
    titleText: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto-medium',
        paddingVertical: 5
    },
    appointmentBtn: {
        width: '50%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        marginTop: 10
    },
    appointmentTextStyle: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        color: Colors.lighter
    },
    bioContainer: {
        width: '100%',
        padding: 10,
        alignSelf: 'flex-start'
    },
    bioHeader: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
    },
    bioDescription: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto',
    },
    imageHeader: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'roboto-bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        padding: 10
    },
    imageScroll: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    iconStyle: {
        position: 'absolute',
        right: '42%',
        top: 30,
        zIndex: 1
    },
    profileStyle: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    handymanSkillContainer: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: Colors.lighter,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    handymanSkillText: {
        fontSize: 12,
        letterSpacing: 1.2,
        fontFamily: 'roboto-medium',
        textAlign: 'justify'
    },
    mediaContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        width: 150,
        height: 100,
        marginHorizontal: 10,
    },
    mediaImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
    }
})

export default Handyman