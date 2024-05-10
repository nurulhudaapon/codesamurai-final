import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  children: React.ReactNode;
  fullScreen?: boolean;
}

export const ActionModal = ({
  isModalVisible,
  setIsModalVisible,
  children,
  fullScreen,
}: Props) => {
  return (
    <Modal
      style={[fullScreen && styles.fullScreen]}
      isVisible={isModalVisible}
      hasBackdrop={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={() => setIsModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? "padding" : "height"}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    margin: 0,
    flex: 1,
  },
});
