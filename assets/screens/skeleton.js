import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Skeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={10}>
      {/* <SkeletonPlaceholder.Item width={500} height={500} borderRadius={50} /> */}
      <SkeletonPlaceholder.Item marginhorizontal={10}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 3.1}
            height={Dimensions.get('screen').height / 18}
            marginHorizontal={5}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 3.1}
            height={Dimensions.get('screen').height / 18}
            marginHorizontal={5}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 3.1}
            height={Dimensions.get('screen').height / 18}
            marginHorizontal={5}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 3.1}
            height={Dimensions.get('screen').height / 18}
            marginHorizontal={5}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default Skeleton;
