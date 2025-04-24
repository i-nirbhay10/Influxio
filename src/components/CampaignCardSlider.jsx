import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite} from '../redux/providerSlice';

const CampaignCardSlider = ({
  title,
  id,
  brandLogo,
  brandImg,
  promotionPlatformIcon,
  status,
}) => {
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.provider.favoriteItems);
  const isFavorited = favorites.some(fav => fav.id === id);

  const fallbackImages = [
    'https://foundr.com/wp-content/uploads/2023/03/Marketing-campaign.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpcg38L4qBK-GJK61vuSOuxccw9icfRNMhYD05pDstBbknuS3rWZ5l6b-R6Ep9CXgU2OM&usqp=CAU',
    'https://woorise.com/wp-content/uploads/2021/01/types-of-marketing-campaigns.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThoKoFZleJgFBizvs1WhCu37QpT86r09sRDf6RWPxdqeZ4crJ2otv0YSvYoqWcbSDZ4jU&usqp=CAU',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
  ];

  // Function to get a random image
  const getRandomFallbackImage = () => {
    const index = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[index];
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Brand Logo */}
        <View style={styles.BrandlogoContainer}>
          <Image
            style={styles.BrandLogo}
            source={{
              uri:
                brandLogo ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa0Jjj3dElLOInmue0EIBKLS-KjeEj95JCQ&s',
            }}
          />

          <TouchableOpacity onPress={() => dispatch(addFavorite(id))}>
            <Icon
              name={isFavorited ? 'heart' : 'heart'}
              size={20}
              color={isFavorited ? 'red' : 'rgba(173, 38, 38, 0.51)'}
            />
          </TouchableOpacity>
        </View>

        {/* Brand Details */}
        <View style={styles.BrandDetails}>
          <View style={styles.BrandNameRewordType}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>cash</Text>
          </View>

          {/* Platform and Application Status */}
          <View style={styles.BrandNameRewordType}>
            <View style={styles.BrandpromotionPlatformType}>
              <Image
                style={styles.promotionPlatformLogo}
                source={{
                  uri:
                    promotionPlatformIcon ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNa0Jjj3dElLOInmue0EIBKLS-KjeEj95JCQ&s',
                }}
              />
              <View>
                <Text style={styles.cardDescription}>content review </Text>
                <Text style={styles.cardDescription}>{status}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.cardDescription}>Application</Text>
              <Text style={styles.cardDescription}>closed</Text>
            </View>
          </View>
        </View>

        {/* Linear Gradient (Improvement: now placed on top of the image) */}
        <LinearGradient
          start={{x: 0.5, y: 0}}
          colors={['rgba(15, 7, 10, 0.84)', 'rgb(10, 6, 8)']}
          style={styles.CampaignDetails}
        />

        {/* Brand Cover Image */}
        <Image
          style={styles.BrandCoverImg}
          source={{
            uri: brandImg ? brandImg : getRandomFallbackImage(),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp(100),
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    height: hp(70),
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
  },
  BrandCoverImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    resizeMode: 'stretch',
    zIndex: -2,
  },
  BrandDetails: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  BrandNameRewordType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BrandpromotionPlatformType: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  promotionPlatformLogo: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    resizeMode: 'contain',
  },
  CampaignDetails: {
    position: 'absolute',
    top: hp(59),
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    zIndex: -1,
    elevation: 2,
  },
  BrandlogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  BrandLogo: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    resizeMode: 'contain',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  cardDescription: {
    fontSize: 12,
    color: '#fff',
  },
});

export default CampaignCardSlider;
