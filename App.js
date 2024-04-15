import React, { useState } from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";

export default function TabOneScreen() {
  const [NICNo, setNICNo] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  const handleFindDetails = () => {
    setError(""); // Clear existing error
    setGender(""); // Clear existing gender
    setDob(""); // Clear existing dob
    setAge(""); // Clear existing age

    let dayText = 0;
    let year = "";
    let month = "";
    let day = "";

    const monthNamesToNumbers = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    if (NICNo.length !== 10 && NICNo.length !== 12) {
      setError("Invalid NIC NO");
    } else if (NICNo.length === 10 && !/^\d+$/.test(NICNo.substr(0, 9))) {
      setError("Invalid NIC NO");
    } else {
      // Year
      if (NICNo.length === 10) {
        year = "19" + NICNo.substr(0, 2);
        dayText = parseInt(NICNo.substr(2, 3));
      } else {
        year = NICNo.substr(0, 4);
        dayText = parseInt(NICNo.substr(4, 3));
      }

      // Gender
      if (dayText > 500) {
        setGender("Female");
        dayText = dayText - 500;
      } else {
        setGender("Male");
      }

      // Day Digit Validation
      if (dayText < 1 || dayText > 366) {
        setError("Invalid NIC NO");
      } else {
        //Month
        // ... other code

        if (dayText > 335) {
          day = (dayText - 335).toString();
          month = "December";
        } else if (dayText > 305) {
          day = (dayText - 305).toString();
          month = "November";
        }

        const monthNumber = monthNamesToNumbers[month];
        setDob(year + "-" + monthNumber + "-" + day);

        const today = new Date();
        const birthday = new Date(year + "-" + monthNumber + "-" + day);
        const ageInMilliseconds = today.getTime() - birthday.getTime();
        const ageInYears = Math.floor(
          ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
        );
        setAge("You are " + ageInYears + " years old.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitile}>NIC Converter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC Number"
          onChangeText={(text) => setNICNo(text)}
          value={NICNo}
          keyboardType="default"
        />
        <Button
          title="Find Details"
          onPress={handleFindDetails}
          color="#fb3512e5"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.outputbox}>
          <Text style={styles.output}>
            {gender ? "Gender: " + gender : null}
          </Text>
          <Text style={styles.output}>
            {dob ? "Date of Birth: " + dob : null}
          </Text>
          <Text style={styles.output}>{age ? age : null}</Text>
        </View>
        <View style={styles.footer}>
        <Text style={styles.bottom}>&lt;/Sadew Hiruditha&gt;</Text>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001738",
    padding: 20,
  },
  tasksWrapper: {
    paddingTop: 80,
  },
  sectionTitile: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
    color: "rgb(232, 232, 232)",
    textTransform: "uppercase",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  output: {
    padding: 10,
    color: "rgb(231, 231, 231)",
    fontSize: 16,
    fontWeight: "bold",
  },

  outputbox: {
    marginTop: 20,
    color: "rgb(220, 220, 220)",
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.197)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignContent: "center",
  },
  footer: {
  
    width: '100%',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  bottom:{
    color: "rgba(217, 217, 217, 0.315)",
    fontSize: 16,
    textAlign: "center",
  },
});
