import { use, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";

const BACKGROUND_COLOR = "#ffffff";
const PRESSED_BACKGROUND_COLOR = "#ffcccc";
const NOTE_COLOR = "#ffffff";
const PRESSED_NOTE_COLOR = "#ffff00";

export default function App() {
  // your work with state
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = () => {
    if (note.trim() === "") return;
    setItems([...items, { value: note }]);
    setNote("");
    //  id: Date.now().toString(),
  };

  const handleLongPress = () => {
    setMessage("The note is pressed with a delay of 1 sec!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={note}
          onChangeText={setNote}
          style={styles.textInput}
          placeholder="Enter your note"
        />
        <Button title="Add note" onPress={handleSubmit} />
      </View>
      <View>
        {items.map((item) => (
          <Pressable
            testID="pressableElem"
            onLongPress={handleLongPress}
            delayLongPress={1000}
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? PRESSED_BACKGROUND_COLOR
                : BACKGROUND_COLOR,
            })}
          >
            {({ pressed }) => (
              <Text
                testID="noteElem"
                style={[
                  styles.noteElem,
                  { color: pressed ? PRESSED_NOTE_COLOR : NOTE_COLOR },
                ]}
              >
                {item.value}
              </Text>
            )}
          </Pressable>
        ))}
        {/* <Text testID="noteElem" style={styles.noteElem}>
            note_text
          </Text> */}
      </View>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  noteElem: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#008000",
    fontSize: 16,
    textAlign: "center",
  },
  message: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff3cd",
    color: "#856404",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
