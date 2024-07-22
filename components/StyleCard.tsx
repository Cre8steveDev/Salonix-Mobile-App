import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { DimensionValue } from 'react-native';

// Style Card Component
const StyleCard = ({
  image,
  name,
  width,
  height,
}: {
  name: string;
  image: string;
  width: DimensionValue;
  height: DimensionValue;
}) => {
  return (
    <Image
      source={{ uri: image }}
      style={{
        width,
        height,
        backgroundColor: Colors.dark.primaryOrange,
        borderRadius: 10,
      }}
      // placeholder={blurhash}
      placeholder={require('@/assets/images/home/loading_image.gif')}
      placeholderContentFit="cover"
      contentFit="cover"
      transition={800}
      contentPosition={{ top: 0, left: 0 }}
      alt={name}
      cachePolicy="memory"
      recyclingKey={image}
      accessible={true}
    />
  );
};

export default StyleCard;
