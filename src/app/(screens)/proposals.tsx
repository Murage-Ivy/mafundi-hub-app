import { View, Text, Modal, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Animated, { FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import Divider from '@/components/divider';
import ProposalNotFound from '@/components/proposal-not-found';
import { useRouter } from 'expo-router';
import { ProposalType } from './handyman-proposal';
import Loader from '@/components/loader';
import { useHandymanId } from '@/contexts/HandymanIdContext';

const Proposal = (props: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>>; taskId: number | null }) => {
    const { authState, userState } = useAuth()
    const { visible, setVisible, taskId } = props
    const [proposals, setProposals] = useState<ProposalType[]>([])
    const [loading, setLoading] = useState(false)
    const { proposal_status, setProposalStatus } = useHandymanId()
    const router = useRouter()
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/job_proposals/?task_id=${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setProposals(data?.job_proposals.map((proposal: ProposalType) => {
                        return {
                            id: proposal.id,
                            handyman_id: proposal.handyman_id,
                            proposal_text: proposal.proposal_text
                        }
                    }))
                }

                if (!response.ok) {
                    let error
                    if (data && data.errors) {
                        error = data.errors
                    }
                    else {
                        error = "Error fetching proposals"
                    }
                    throw new Error(error)
                }
                // console.log("This is the data", data)
            }
            catch (error: any) {
                console.log("Error fetching proposals", error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchProposals()
    }, [taskId])


    const handleProposalUpdate = async (proposalId: number, payload: string) => {
        try {
            setLoading(true)

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/job_proposals/${proposalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.token}`
                },
                body: JSON.stringify({
                    job_status: payload
                })
            })

            const data = await response.json()

            if (response.ok) {
                console.log("Proposal accepted", data)
                setProposalStatus!(data?.data.job_status)
                router.push(`/handyman-listing/${data?.data.handyman_id}`)
            }

        }
        catch (error: any) {
            console.log("Error accepting proposal", error.message)
        }
        finally {
            setLoading(false)
        }

    }
    const proposalList = proposals?.map((proposal) => {
        return (
            <View key={proposal.id} style={proposalStyle.proposalContainer}>
                <Text style={[proposalStyle.textStyle, { marginBottom: 10 }]}>
                    {proposal.proposal_text}
                </Text>
                <Divider />
                <View style={proposalStyle.btnContainer}>

                    <Pressable style={proposalStyle.btnProfile} onPress={() => {
                        router.push(`/handyman-listing/${proposal.handyman_id}`)
                    }}>
                        <Text style={[proposalStyle.textStyle, { color: Colors.lighter, fontFamily: 'roboto-bold' }]}>View Profile</Text>
                    </Pressable>
                    <Pressable style={proposalStyle.button} onPress={() => {
                        handleProposalUpdate(proposal.id, 'accepted')
                    }}>
                        <FontAwesome5 name="check" color={'green'} size={20} />
                    </Pressable>
                    <Pressable style={proposalStyle.button} onPress={() => {
                        handleProposalUpdate(proposal.id, 'rejected')
                    }}>
                        <Octicons name="x" color={'red'} size={20} />
                    </Pressable>

                </View>
            </View>
        )
    })

    return (
        <Animated.View entering={FadeOutUp} exiting={FadeOutDown}>
            <Modal animationType='slide' visible={visible} transparent>
                <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <ScrollView style={proposalStyle.scroll} contentContainerStyle={proposalStyle.contentStyle}>
                        <View style={proposalStyle.container}>
                            <Text style={proposalStyle.proposalHeader}>Proposals</Text>
                            <Octicons name='x-circle' size={20} color={Colors.primary} onPress={() => {
                                setVisible(!visible)
                            }} />
                        </View>
                        {!loading && proposalList?.length === 0 ? <ProposalNotFound /> : proposalList}
                    </ScrollView>
                </SafeAreaView>
                <Loader isLoading={loading} />
            </Modal>
        </Animated.View >

    )
}
const proposalStyle = StyleSheet.create({
    proposalHeader: {
        fontFamily: 'roboto-bold',
        letterSpacing: 1.4,
        paddingBottom: 5,
        fontSize: 16,
        color: Colors.secondary,
        textAlign: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginBottom: 10,
    },
    proposalContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    contentStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "column",
        width: "100%",
        paddingBottom: 50,
        marginTop: 100,
        paddingTop: 20,
        paddingHorizontal: 14,
        backgroundColor: Colors.lighter,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1
    }
    ,
    textStyle: {
        fontFamily: 'roboto',
        letterSpacing: 1.4,
        fontSize: 14,
        color: Colors.dark,
        textAlign: 'justify'
    },
    btnProfile: {
        borderRadius: 18,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Colors.primary
    },
    button: {
        backgroundColor: Colors.lighter,
        borderRadius: 40,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
})
export default Proposal