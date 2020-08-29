import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

interface IVoteViewProps {
    categories:string[],
    votedCallback:()=>void
}

function mapCategoriesToButtons(categories:string[], votedCallback:()=>void){
    return (
        categories.map((c, index) =>
        <TouchableOpacity key={index} style={styles.appButtonContainer} onPress={()=>castVote(votedCallback)}>
            <Text style={styles.appButtonText}>{c}</Text>
        </TouchableOpacity>)
        );
}

function castVote(votedCallback:()=>void){
    votedCallback();
}

export function VoteView(props: IVoteViewProps){
    return (
        <View style={styles.container}>
            <Text style={styles.appItemText}>Where should we put this?</Text>
              {mapCategoriesToButtons(props.categories, props.votedCallback)}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    appButtonContainer: {
        backgroundColor:"#3d801f",
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        minWidth:150,
        margin:5
    },
    appButtonText: {
        color: "#ffffff",
        alignSelf: "center",

    },
    appItemText:{
        color:"#000000",
        fontSize:18,
        alignSelf:"center",
        fontWeight:"400",
        marginBottom:20
    }
});