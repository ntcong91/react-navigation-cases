import React, {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  Ref,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
  Easing,
  TouchableOpacity,
  InteractionManager,
  ViewStyle,
  ColorValue,
  TextStyle,
  Text,
} from 'react-native';
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {isBoolean, isNull, isNumber, isObject, isString} from 'lodash';
import {hasNotch} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../themes';

const animatedDuration = 350;
const minVelocityToFling = -150;
const navBarOffset = 56;

const IS_IOS = Platform.OS === 'ios';
const DEFAULT_WARNING_COLOR = Colors.yellow400;

const TITLE_COLORS: {
  success: TextStyle['color'];
  error: TextStyle['color'];
  warn: TextStyle['color'];
} = {
  success: Colors.green400,
  error: Colors.red400,
  warn: Colors.yellow400,
};

const MESSAGE_COLORS: {
  success: TextStyle['color'];
  error: TextStyle['color'];
  warn: TextStyle['color'];
} = {
  success: Colors.white,
  error: Colors.red400,
  warn: DEFAULT_WARNING_COLOR,
};

const LIGHT_TITLE_COLORS: {
  success: TextStyle['color'];
  error: TextStyle['color'];
  warn: TextStyle['color'];
} = {
  success: Colors.lightBlue700,
  error: Colors.lightBlue700,
  warn: DEFAULT_WARNING_COLOR,
};

const LIGHT_MESSAGE_COLORS: {
  success: TextStyle['color'];
  error: TextStyle['color'];
  warn: TextStyle['color'];
} = {
  success: Colors.lightBlue700,
  error: Colors.red400,
  warn: DEFAULT_WARNING_COLOR,
};

type InAppNotificationType = 'success' | 'error' | 'warn';

export type InAppNotificationOptions = {
  title?: string;
  message?: string;
  type?: InAppNotificationType;
  style?: ViewStyle;
  duration?: number;
  isLight?: boolean;
  autoHide?: boolean;
  hideStatusBar?: boolean;
  isDone?: boolean;
  closeBtnColor?: string | ColorValue;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
  onDragGestureHandlerStateChange?: (event: HandlerStateChangeEvent) => void;
  onDragGestureEvent?: (event: GestureEvent) => void;
};

interface DefaultParamsOptions {
  title: string;
  message: string;
  type: InAppNotificationType;
  style: ViewStyle;
  duration: number;
  isLight: boolean;
  autoHide: boolean;
  hideStatusBar: boolean;
  translationY: number;
  offset: number;
  closeBtnColor: string | ColorValue;
  isDone: false;
}

const DEFAULT_PARAMS: DefaultParamsOptions = {
  title: '',
  message: '',
  type: 'success',
  style: {},
  duration: 3000,
  isLight: false,
  autoHide: true,
  hideStatusBar: false,
  translationY: -208,
  offset: 22,
  closeBtnColor: Colors.red400,
  isDone: false,
};

export interface InAppNotificationRef {
  show: (options: InAppNotificationOptions) => void;
  hide: () => void;
}

const InAppNotification = forwardRef(({}, ref: Ref<InAppNotificationRef>) => {
  // OPTIONS ================================================================
  const [visible, setVisible] = useState<boolean | null>(null); // null for avoiding bug hide on the first time
  const [style, setStyle] = useState<ViewStyle>({});
  const [title, setTitle] = useState<string>(DEFAULT_PARAMS.title);
  const [message, setMessage] = useState<string>(DEFAULT_PARAMS.message);
  const [autoHide, setAutoHide] = useState<boolean>(DEFAULT_PARAMS.autoHide);
  const [duration, setDuration] = useState<number>(DEFAULT_PARAMS.duration);
  const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);
  const [type, setType] = useState<InAppNotificationType>('success');
  const [isLight, setLight] = useState<boolean>(DEFAULT_PARAMS.isLight);

  // Callback function from options
  const [onHide, setOnHide] = useState<() => void>(() => {});
  const [onShow, setOnShow] = useState<() => void>(() => {});
  const [onDragGestureEvent, setOnDragGestureEvent] = useState<
    InAppNotificationOptions['onDragGestureEvent']
  >((_e: GestureEvent) => {});
  const [onDragGestureHandlerStateChange, setOnDragGestureHandlerStateChange] =
    useState<(event: HandlerStateChangeEvent) => void>(() => {});
  const [onPress, setOnPress] = useState<InAppNotificationOptions['onPress']>(
    () => {},
  );

  // OPTIONS ================================================================

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [cTranslationY, setCTranslationY] = useState(
    new Animated.Value(DEFAULT_PARAMS.translationY),
  );
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const offset = useRef<number>(DEFAULT_PARAMS.offset);
  const viewHeight = useRef(108);
  const timer:
    | {
        current: any;
      }
    | null
    | undefined = useRef(null);

  useEffect(() => {
    if (visible) {
      show();
    } else if (!isNull(visible)) {
      hide();
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    show: (options: InAppNotificationOptions) => {
      setTitle(options?.title || DEFAULT_PARAMS.title);
      setMessage(options?.message || DEFAULT_PARAMS.message);
      setStyle(isObject(options?.style) ? options.style : DEFAULT_PARAMS.style);
      setDuration(
        isNumber(options?.duration)
          ? options.duration
          : DEFAULT_PARAMS.duration,
      );
      setAutoHide(
        isBoolean(options?.autoHide)
          ? options.autoHide
          : DEFAULT_PARAMS.autoHide,
      );
      setHideStatusBar(
        isBoolean(options?.hideStatusBar)
          ? options.hideStatusBar
          : DEFAULT_PARAMS.hideStatusBar,
      );
      setType(isString(options?.type) ? options?.type : DEFAULT_PARAMS.type);

      setLight(
        isBoolean(options?.isLight) ? options.isLight : DEFAULT_PARAMS.isLight,
      );

      options?.onShow && setOnShow(options?.onShow);
      options?.onHide && setOnHide(options?.onHide);
      options?.onDragGestureEvent &&
        setOnDragGestureEvent(options?.onDragGestureEvent);
      options?.onDragGestureHandlerStateChange &&
        setOnDragGestureHandlerStateChange(
          options?.onDragGestureHandlerStateChange,
        );
      setOnPress(() => options?.onPress);
      setVisible(true);
    },
    hide: () => {
      resetState();
      setVisible(false);
    },
  }));

  const resetState = () => {
    setTitle(DEFAULT_PARAMS.title);
    setMessage(DEFAULT_PARAMS.message);
    setStyle(DEFAULT_PARAMS.style);
    setDuration(DEFAULT_PARAMS.duration);
    setAutoHide(DEFAULT_PARAMS.autoHide);
    setHideStatusBar(DEFAULT_PARAMS.hideStatusBar);
    setType('success');
    setLight(DEFAULT_PARAMS.isLight);

    setOnShow(() => {});
    setOnHide(() => {});
    setOnDragGestureEvent(() => {});
    setOnDragGestureHandlerStateChange(() => {});
    setOnPress(() => {});
  };

  const show = () => {
    handleAutoHide();

    InteractionManager.runAfterInteractions(() => {
      Animated.spring(cTranslationY, {
        toValue: 0,
        useNativeDriver: true,
      }).start(({}) => {});
    });

    if (typeof onShow === 'function') {
      onShow();
    }

    if (hideStatusBar) {
      IS_IOS && StatusBar.setHidden(true, 'slide');
    }
  };

  const hide = () => {
    InteractionManager.runAfterInteractions(() => {
      const toValue =
        (viewHeight.current + navBarOffset + offset.current * 2) * -1;
      Animated.timing(cTranslationY, {
        toValue,
        useNativeDriver: true,
        duration: animatedDuration,
        easing: Easing.bezier(0.53, 0.67, 0.19, 1.1),
      }).start(({finished}) => {
        if (finished) {
        }
      });
    });

    if (onHide) {
      onHide();
    }

    if (hideStatusBar) {
      IS_IOS && StatusBar.setHidden(false, 'slide');
    }
  };

  const handleAutoHide = () => {
    timer.current && clearTimeout(timer.current);
    timer.current = null;
    if (autoHide) {
      timer.current = setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  };

  const onGestureEvent = (event: GestureEvent) => {
    const translationY: any = event.nativeEvent.translationY;
    const value =
      translationY > 0 ? translationY / 9 : translationY / (IS_IOS ? 2 : 1);
    cTranslationY.setValue(value);

    if (onDragGestureEvent) {
      onDragGestureEvent(event);
    }
  };

  const onHandlerStateChange = (event: HandlerStateChangeEvent) => {
    const {velocityY, translationY, numberOfPointers} = event.nativeEvent;

    if (onDragGestureHandlerStateChange) {
      onDragGestureHandlerStateChange(event);
    }

    if (
      isNumber(velocityY) &&
      velocityY < minVelocityToFling &&
      numberOfPointers === 0
    ) {
      const value = (viewHeight.current + offset.current * 2) * -1;
      Animated.spring(cTranslationY, {
        toValue: value,
        useNativeDriver: true,
        velocity: velocityY,
      }).start();
      return;
    }

    if (
      isNumber(translationY) &&
      translationY > (viewHeight.current / 2) * -1 &&
      numberOfPointers === 0
    ) {
      show();
    } else {
      hide();
    }
  };

  const onTapHandlerStateChange = (event: HandlerStateChangeEvent) => {
    console.log('event', event);
    const {state} = event.nativeEvent;

    switch (state) {
      case 2:
        timer?.current && clearTimeout(timer.current);
        break;
      case 4:
        handleAutoHide();
        break;
      default:
        break;
    }
  };

  const handlePress = () => {
    console.log('handlePress');
    setVisible(false);
    onPress && onPress();
  };

  const handlePressClose = () => {
    setVisible(false);
  };

  const renderComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.content, isLight && {backgroundColor: Colors.white}]}
        onPress={handlePress}>
        <View style={styles.logoContainer}>
          <Icon name="heart" size={32} color={Colors.white} />
        </View>
        <View style={styles.inAppNotificationTextContainer}>
          <Text
            style={StyleSheet.flatten([
              styles.title,
              {color: TITLE_COLORS[type]},
              isLight && {
                color: LIGHT_TITLE_COLORS[type],
              },
            ])}>
            {title}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={2}
            style={StyleSheet.flatten([
              styles.message,
              {color: MESSAGE_COLORS[type]},
              isLight && {
                color: LIGHT_MESSAGE_COLORS[type],
              },
            ])}>
            {message || ''}
          </Text>
        </View>
        <Icon
          name="close"
          size={24}
          color={Colors.white}
          style={styles.buttonClose}
          onPress={handlePressClose}
        />
      </TouchableOpacity>
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <Fragment>
      <PanGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            styles.notification,
            style,
            {
              top: offset.current,
              transform: [
                {
                  translateY: cTranslationY,
                },
              ],
            },
          ]}>
          <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange}>
            {renderComponent()}
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Fragment>
  );
});

export default InAppNotification;

const styles = StyleSheet.create({
  notification: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    elevation: 6,
    zIndex: 1000,
    position: 'absolute',
    alignSelf: 'center',
  },
  content: {
    width: '96%',
    backgroundColor: Colors.lightBlue700,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 100,
    borderRadius: 10,
    marginTop: hasNotch() ? 24 : 8,
  },
  logoContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  inAppNotificationTextContainer: {
    marginVertical: 16,
    marginLeft: 24,
    flex: 1,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {},
  message: {
    marginTop: 4,
  },
  yLogo: {
    width: 34,
    height: 34,
  },
});
