import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type SlotCardProp = {
  slot: slotDataProp;
  selectedTimeSlot: slotDataProp;
  setSelectedTimeSlot: React.Dispatch<
    React.SetStateAction<slotDataProp | null>
  >;
};

const SlotCardComp = ({
  slot,
  setSelectedTimeSlot,
  selectedTimeSlot,
}: SlotCardProp) => {
  // Define State of current slot
  const available = slot.isBooked === false;
  const disabled = slot.isBooked === true;
  let selected = false;

  if (selectedTimeSlot) selected = slot.id === selectedTimeSlot.id;

  //   Return JSX that matches
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => {
        if (
          (selectedTimeSlot && selectedTimeSlot.id === slot.id) ||
          slot.isBooked
        ) {
          return;
        }
        setSelectedTimeSlot(slot);
      }}
    >
      <View
        style={[
          styles.box,
          available && styles.availableBox,
          disabled && styles.disabledBox,
          selected && styles.chosenBox,
        ]}
      >
        {/* Slot ID Circle  */}
        <Text
          style={[
            styles.defaultSlotId,
            disabled ? styles.slotIdDisabled : styles.slotId,
          ]}
        >
          {slot.id.toString().padStart(2, '0')}
        </Text>
        {/* Time Texts */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{slot.startTime}</Text>
          <Text style={styles.timeText}>- to -</Text>
          <Text style={styles.timeText}>{slot.endTime}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SlotCardComp;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop: 15,
  },
  box: {
    width: 90,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    position: 'relative',
  },
  defaultSlotId: {
    width: 40,
    height: 40,
    textAlign: 'center',
    paddingTop: 10,
    borderRadius: 100,
    color: Colors.dark.white,
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    marginHorizontal: 'auto',
    transform: [{ translateY: -14 }],
  },
  slotId: {
    backgroundColor: Colors.dark.primaryHighlight,
  },
  slotIdDisabled: {
    backgroundColor: Colors.dark.placeholder,
  },
  availableBox: {
    backgroundColor: Colors.dark.primaryHighlight,
  },
  disabledBox: {
    backgroundColor: Colors.dark.placeholder,
  },
  chosenBox: {
    backgroundColor: Colors.dark.primaryOrange,
  },
  timeText: {
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: Colors.dark.white,
    fontSize: 15,
    lineHeight: 19,
  },
  timeContainer: {
    marginTop: -8,
  },
});
