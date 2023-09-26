import React, { useEffect, memo } from 'react'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import Svg, { ClipPath, Defs, Path } from 'react-native-svg'
import AnimatedStroke from './animated-stroke'

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath = 'M38 62C68 62 88 80 88 122C100 91 133 17 213 29'
const outlineBoxPath =
  'M126 2H57C26.6243 2 2 26.6243 2 57V103C2 133.376 26.6243 158 57 158H126C156.376 158 181 133.376 181 103V57C181 26.6243 156.376 2 126 2ZM57 0C25.5198 0 0 25.5198 0 57V103C0 134.48 25.5198 160 57 160H126C157.48 160 183 134.48 183 103V57C183 25.5198 157.48 0 126 0H57Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
  checked?: boolean
}

const AnimatedCheckbox = (props: Props) => {
  const { checked } = props
  const checkmarkColor = '#000000'
  const highlightColor = '#ff0000'
  const boxOutlineColor = '#000000'

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        [boxOutlineColor, highlightColor],
        'RGB'
      ),
      fill: interpolateColor(
        Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        ['#00000000', highlightColor],
        'RGB'
      )
    }),
    [highlightColor, boxOutlineColor]
  )

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <Defs>
        <ClipPath id="clipPath">
          <Path
            fill="while"
            stroke="gray"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </ClipPath>
      </Defs>
      <AnimatedPath
        d={outlineBoxPath}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <AnimatedStroke
        progress={progress}
        d={checkMarkPath}
        stroke={checkmarkColor}
        strokeLinejoin="round"
        strokeWidth={10}
        strokeLinecap="round"
        strokeOpacity={checked || false ? 1 : 0}
      />
    </Svg>
  )
}
export default AnimatedCheckbox
