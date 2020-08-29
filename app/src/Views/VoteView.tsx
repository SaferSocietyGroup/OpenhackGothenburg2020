import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getCategories, postVote } from "../Functions/Api";

interface IVoteViewProps {
  votedCallback: () => void;
  barcode: string;
}

function mapCategoriesToButtons(categories: string[], votedCallback: () => void, barcode: string) {
  return categories.map((c, index) => (
    <TouchableOpacity key={index} style={styles.appButtonContainer} onPress={() => castVote(barcode, c, votedCallback)}>
      <Text style={styles.appButtonText}>{c}</Text>
    </TouchableOpacity>
  ));
}

function castVote(barcode: string, categoryId: string, votedCallback: () => void) {
  postVote(barcode, categoryId);
  votedCallback();
}

export function VoteView(props: IVoteViewProps) {
  const [categories, setCategories] = React.useState<string[] | null | undefined>(null);

  React.useEffect(() => {
    getCategories().then((data) => {
      setCategories(data?.categories);
    });
  }, []);

  if (!categories) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appItemText}>Where should we put this?</Text>
      {mapCategoriesToButtons(categories, props.votedCallback, props.barcode)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonContainer: {
    backgroundColor: "#3d801f",
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 150,
    margin: 5,
  },
  appButtonText: {
    color: "#ffffff",
    alignSelf: "center",
  },
  appItemText: {
    color: "#000000",
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "400",
    marginBottom: 20,
  },
});
