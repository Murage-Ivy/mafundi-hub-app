import { View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Select from './select'
import { useLocation } from '@/hooks/useLocation'
import { stringfy } from '@/utils/stringify'
import { useService } from '@/hooks/useService'

export const LocationFilter = ({ setLocation, visible, setVisible }: { setLocation: Dispatch<SetStateAction<string>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
    const locations = useLocation()
    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>

                    <Select
                        data={locations?.length > 0 &&
                            locations !== undefined &&
                            locations?.map((location) => {
                                return {
                                    label: stringfy(location),
                                    value: stringfy(location)
                                }
                            }) || []}
                        defaultButtonText={'Location'}
                        profile={false}
                        handleChange={(value) => {
                            const city = value.split(',')[0]
                            value.length > 0 && setVisible(false)
                            setLocation(city)
                        }}
                        searchPlaceHolder='Search for a Location'
                        task={true}
                    />
                </View>
            }
        </>
    )

}

export const ServiceFilter = ({ setService, visible, setVisible }: { setService: Dispatch<SetStateAction<string>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
    const services = useService()

    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>
                    <Select
                        data={services || []}
                        searchPlaceHolder='Search for a service'
                        handleChange={(value) => {
                            value.length > 0 && setVisible(false)
                            setService(value)
                        }
                        }
                        defaultButtonText={'Service'}
                        profile={false}
                        task={true}
                        search={true}
                    />
                </View>
            }
        </>
    )
}

export const AvailabilityFilter = ({ setAvailable, visible, setVisible }: { setAvailable: Dispatch<SetStateAction<boolean>>, setVisible: Dispatch<SetStateAction<boolean>>, visible: boolean }) => {
    return (
        <>
            {
                visible &&
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                }}>
                    <Select
                        data={[{ label: 'Available', value: 'true' }, { label: 'Not Available', value: 'false' }]}
                        searchPlaceHolder='Availability'
                        handleChange={(value) => {
                            value.length > 0 && setVisible(false)
                            setAvailable(value === 'true' ? true : false)
                        }
                        }
                        defaultButtonText={'Availability'}
                        profile={false}
                        task={true}
                    />
                </View>
            }
        </>
    )
}
{/* <Select
data={[{ label: 'true', value: 'true' }, { label: 'false', value: 'false' }] || []}
searchPlaceHolder='Instant booking'
handleChange={(value) => setFieldValue('instant_booking', value)}
defaultButtonText='Instant Booking'
profile={false}
task={true}
/> */}