import Svg, { Path, SvgProps } from "react-native-svg";

type MagnifyingGlassProps = SvgProps

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = (props) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        {...props}
    >
        <Path
            opacity="0.4"
            d="M7.66634 14.0002C11.1641 14.0002 13.9997 11.1646 13.9997 7.66683C13.9997 4.16903 11.1641 1.3335 7.66634 1.3335C4.16854 1.3335 1.33301 4.16903 1.33301 7.66683C1.33301 11.1646 4.16854 14.0002 7.66634 14.0002Z"
            fill="#97A1AC"
        />
        <Path
            d="M14.1997 14.6669C14.0797 14.6669 13.9597 14.6202 13.873 14.5335L12.633 13.2935C12.453 13.1135 12.453 12.8202 12.633 12.6335C12.813 12.4535 13.1064 12.4535 13.293 12.6335L14.533 13.8735C14.713 14.0535 14.713 14.3469 14.533 14.5335C14.4397 14.6202 14.3197 14.6669 14.1997 14.6669Z"
            fill="#97A1AC"
        />
    </Svg>
);

export default MagnifyingGlass;