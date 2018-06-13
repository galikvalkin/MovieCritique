// @flow

import ActionSheet from '@yfuks/react-native-action-sheet';

const initButtonList = (list) => {
  let buttonList = list.map((item) => {
      return item.label;
    }),
    buttonOptions = {};

  for (let i = 0; i < list.length; i++) {
    let key = list[i].label;
    buttonOptions[key] = list[i];
  }
  let cancelIndex = null;

  list.forEach((item, index) => {
    if (item.isCancel) {
      cancelIndex = index;
    }
  });

  return {
    list: buttonList,
    options: buttonOptions,
    cancelIndex: cancelIndex
  };
};

export function showActionSheet(listOfButtons) {
  const { list, options, cancelIndex } = initButtonList(listOfButtons);

  let a_options = {
    options: list,
    tintColor: 'blue'
  };
  if (cancelIndex) {
    a_options.cancelButtonIndex = cancelIndex;
  }
  ActionSheet.showActionSheetWithOptions(a_options,
        (buttonIndex: number) => {
      if (buttonIndex !== undefined && buttonIndex !== null) {
        let key = list[buttonIndex];
        options[key].onPress(buttonIndex, list[buttonIndex]);
      }
  });
}
