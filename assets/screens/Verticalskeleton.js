import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Verticalskeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={10}>
      {/* <SkeletonPlaceholder.Item width={500} height={500} borderRadius={50} /> */}
      <SkeletonPlaceholder.Item marginhorizontal={10}>
        <SkeletonPlaceholder.Item alignItems="center">
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 1.05}
            height={Dimensions.get('screen').height / 5}
            marginVertical={5}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('screen').width / 1.05}
            height={Dimensions.get('screen').height / 5}
            marginVertical={5}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default Verticalskeleton;
