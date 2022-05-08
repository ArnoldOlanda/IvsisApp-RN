import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../theme/colors'
import { groupListStyles } from '../../theme/groupListTheme'

export const GroupListItem = () => {
    return (
        <View>
            <View style={groupListStyles.groupListItemContainer}>
                <View style={groupListStyles.itemMainContent}>
                    <Text style={{ color: colors.textPrimary, fontSize: 20 }}>Vecinos arequipa</Text>
                    <Text style={{ color: 'gray', fontSize: 16 }}>30 miembros</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.textPrimary }}>IC</Text>
                </View>
            </View>
            <View style={groupListStyles.lineBottom}></View>
        </View>
    )
}
