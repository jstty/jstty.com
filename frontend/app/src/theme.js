import Colors from 'material-ui/lib/styles/colors';
import Spacing from 'material-ui/lib/styles/spacing';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

export default {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.red900,
        primary2Color: Colors.red900,
        primary3Color: Colors.grey600,
        accent1Color: Colors.grey600,
        accent2Color: Colors.grey700,
        accent3Color: Colors.grey900,
        textColor: ColorManipulator.fade(Colors.fullWhite, 0.76),
        alternateTextColor: ColorManipulator.fade(Colors.fullWhite, 0.75),
        canvasColor: '#303030',
        borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
        disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
        pickerHeaderColor: ColorManipulator.fade(Colors.fullWhite, 0.12),
        clockCircleColor: ColorManipulator.fade(Colors.fullWhite, 0.12)
    },
};