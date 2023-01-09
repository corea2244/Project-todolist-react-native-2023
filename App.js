import dayjs from "dayjs";
import { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import Margin from "./src/Margin";
import { runPracticeDayjs } from "./src/practice-dayjs";
import { getCalendarColumns, getDayColor, getDayText } from "./src/util";
import { SimpleLineIcons } from "@expo/vector-icons";

const columnSize = 30;
const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

const Column = ({ text, color, opacity }) => {
  return (
    <View
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </View>
  );
};

const ArrowButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 15 }}>
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  );
};

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format("YYYY.MM.DD");
    return (
      <View>
        <Margin height={15} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconName="arrow-left" onPress={() => null} />
          <TouchableOpacity>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton iconName="arrow-right" onPress={() => null} />
        </View>
        <Margin height={15} />
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const RenderItem = ({ date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, "month");

    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
      />
    );
  };

  useEffect(() => {
    runPracticeDayjs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={({ item }) => <RenderItem date={item} />}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace,
  },
});
