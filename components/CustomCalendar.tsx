import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import Colors from '@/constants/Colors';
import { Calendar } from 'react-native-calendars';

type CustomCalendarProp = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
}: CustomCalendarProp) => {
  // Calculate today's date for the minimum selectable day
  const currentDateString = new Date().toISOString().split('T')[0];

  // Compute day to highlight selected day on calendar
  const colorSelected = (selected: string) => {
    let day = selected.split('-')[2];
    console.log(day);
    if (day[0] === '0') {
      day = day[1];
    }
    return +day;
  };
  const activeDay = useMemo(() => colorSelected(selectedDate), [selectedDate]);

  //   Return JSX Component
  return (
    <Calendar
      style={{
        height: 310,
        padding: 10,
        // This was a hack for current specific use case
        marginTop: -10,
      }}
      theme={{
        arrowColor: 'white',
        backgroundColor: Colors.dark.primaryHighlight,
        calendarBackground: Colors.dark.primaryHighlight,
        textDisabledColor: Colors.dark.placeholder,
        monthTextColor: 'white',
        dayTextColor: Colors.dark.white,
      }}
      current={selectedDate}
      minDate={currentDateString}
      disableAllTouchEventsForDisabledDays={true}
      // calendarBackground={'red'}
      monthTextColor={Colors.dark.white}
      textSectionTitleColor={Colors.dark.white}
      enableSwipeMonths={true}
      // onDayPress={(day: CalendarDayType) => {
      //   setSelectedDate(day.dateString);
      // }}
      // Implement a custom Day Component
      dayComponent={({
        date,
        state,
      }: {
        date: CalendarDayType;
        state: any;
      }) => {
        return (
          <Pressable
            onPress={() => setSelectedDate(date.dateString)}
            style={[
              state !== 'disabled'
                ? activeDay === date.day
                  ? styles.selectedDay
                  : styles.activeDayContainer
                : styles.disabledDayContainer,
              styles.dayContainer,
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                color:
                  state === 'disabled'
                    ? Colors.dark.placeholder
                    : Colors.dark.white,
              }}
            >
              {date.day}
            </Text>
          </Pressable>
        );
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          marked: true,
          selectedColor: Colors.dark.primaryOrange,
          dotColor: 'white',
          disabled: false,
          disableTouchEvent: false,
        },
      }}
    />
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({
  calendarStyle: {},
  dayContainer: {
    width: 35,
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -4,
  },

  activeDayContainer: {
    backgroundColor: Colors.dark.primaryDark,
  },
  selectedDay: {
    backgroundColor: Colors.dark.primaryOrange,
  },
  disabledDayContainer: {
    backgroundColor: '#2a3a40',
  },
});
