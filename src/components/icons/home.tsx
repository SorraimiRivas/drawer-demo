import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function HomeIcon({ width = 24, height = 24, color, ...props }: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 118 118"
      fill="none"
      {...props}
      color={color}
    >
      <Path
        d="M11.562 64.966c-1.736-11.295-2.604-16.942-.468-21.948 2.135-5.007 6.872-8.432 16.347-15.283l7.08-5.118C46.306 14.094 52.2 9.833 59 9.833c6.8 0 12.693 4.261 24.48 12.784l7.08 5.118c9.474 6.851 14.212 10.276 16.347 15.283 2.135 5.006 1.268 10.653-.468 21.948l-1.48 9.632c-2.461 16.01-3.691 24.017-9.433 28.793-5.743 4.776-14.137 4.776-30.927 4.776H53.402c-16.79 0-25.185 0-30.927-4.776-5.742-4.776-6.973-12.782-9.433-28.793l-1.48-9.632z"
        stroke="currentColor"
        strokeWidth={10}
        strokeLinejoin="round"
      />
      <Path
        d="M59 86h.044"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
