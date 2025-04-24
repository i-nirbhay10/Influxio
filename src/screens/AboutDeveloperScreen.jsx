import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons'; // FontAwesome Icon

const AboutDeveloperScreen = ({navigation}) => {
  const openLink = url => Linking.openURL(url);

  const Section = ({icon, title, children}) => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>
        <Icon name={icon} size={16} /> {title}
      </Text>
      <View>{children}</View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.Titleheader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>About Devloper 👨‍💻</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.header}>Nirbhay Verma</Text>
        <Text style={styles.subHeader}>Full Stack Developer</Text>
      </View>

      <Section icon="map-marker-alt" title="Location">
        <Text style={styles.sectionText}>
          Gorakhpur, Uttar Pradesh, India (273015)
        </Text>
      </Section>

      <Section icon="envelope" title="Contact">
        <Text style={styles.sectionText}>nirbhayverma10@gmail.com</Text>
        <Text style={styles.sectionText}>+91 8787280055</Text>
      </Section>

      <Section icon="link" title="Links">
        <TouchableOpacity
          onPress={() =>
            openLink('https://www.linkedin.com/in/nirbhay-verma-441695217/')
          }>
          <Text style={styles.linkText}>
            <Icon name="linkedin" /> LinkedIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink('https://github.com/i-nirbhay10')}>
          <Text style={styles.linkText}>
            <Icon name="github" /> GitHub
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink('https://info-nirbhay.netlify.app')}>
          <Text style={styles.linkText}>
            <Icon name="globe" /> Portfolio
          </Text>
        </TouchableOpacity>
      </Section>

      <Section icon="user" title="About Me">
        <Text style={styles.sectionText}>
          I'm a passionate MERN stack developer and AI enthusiast from
          Gorakhpur, India. With a strong foundation in full-stack development,
          I build responsive, scalable, and user-focused mobile and web
          applications.
        </Text>
        <Text style={styles.sectionText}>
          I’ve also completed specialized education in Artificial Intelligence
          and actively apply AI tools and models in real-world projects. Whether
          it’s building a full-stack system or integrating smart features using
          AI, I enjoy pushing the limits of what technology can do.
        </Text>
        <Text style={styles.sectionText}>
          My goal is to continue building innovative digital experiences and to
          always stay ahead by learning and adapting to new technologies in both
          software development and artificial intelligence.
        </Text>
      </Section>

      <Section icon="code" title="Skills">
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Frontend:</Text>{' '}
          React.js, React Native, Tailwind CSS, Bootstrap
        </Text>
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Backend:</Text>{' '}
          Node.js, Express.js, JWT, RESTful APIs
        </Text>
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Database:</Text>{' '}
          MongoDB, MySQL, Firebase
        </Text>
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>
            DevOps & Tools:
          </Text>{' '}
          Git, GitHub, Netlify, Render
        </Text>
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>
            AI Technologies:
          </Text>{' '}
          ChatGPT (OpenAI), Geminai , Google Cloud AI, TensorFlow (Basic),
          AI-powered search and recommendation systems
        </Text>
        <Text style={styles.sectionText}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Other:</Text> Google
          Authentication, Python, C, C++, MS Office
        </Text>
      </Section>

      <Section icon="graduation-cap" title="Education">
        <Text style={styles.sectionText}>
          B.Tech (IT) – Dr. RML Awadh University – 77% (2023){'\n'}
          Diploma CSE – Maharana Pratap Polytechnic – 73% (2017)
        </Text>
      </Section>

      <Section icon="certificate" title="Certifications">
        <Text style={styles.sectionText}>
          Python (NIELIT), Web Dev (Internshala), Software Testing (Great
          Learning), Communication Skills (TCS)
        </Text>
      </Section>

      <Section icon="briefcase" title="Experience">
        <Text style={styles.sectionText}>
          • React Native Developer @ DG Digital (Dec 2024 – Present){'\n'}• Full
          Stack Developer @ Jouls Ecotech (Dec 2023 – Aug 2024)
        </Text>
      </Section>

      <Section icon="project-diagram" title="Projects">
        <TouchableOpacity
          onPress={() => openLink('https://wiregram.netlify.app/')}>
          <Text style={styles.projectText}>
            📷 Wiregram – Instagram clone (MERN)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink('https://openadmin.netlify.app')}>
          <Text style={styles.projectText}>
            📊 Analytics Dashboard with Google Auth
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink('https://info-nirbhay.netlify.app')}>
          <Text style={styles.projectText}>🌍 Personal Portfolio Web App</Text>
        </TouchableOpacity>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 200,
  },
  Titleheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  profileCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 6,
  },
  section: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00aced',
    marginBottom: 8,
  },
  sectionText: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
  },
  linkText: {
    color: '#4fa3ff',
    fontSize: 15,
    marginTop: 6,
  },
  projectText: {
    color: '#80dfff',
    fontSize: 15,
    marginTop: 6,
  },
});

export default AboutDeveloperScreen;

// import React from 'react';
// import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const AboutDeveloperScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>👨‍💻 About the Developer</Text>
//       <Text style={styles.text}>
//         This app was developed by <Text style={styles.name}>Nirbhay Verma</Text>
//         , a passionate software developer focused on building user-centric
//         mobile apps.
//       </Text>

//       <Text style={styles.subtitle}>Connect with me:</Text>
//       <TouchableOpacity
//         onPress={() => Linking.openURL('https://github.com/i-nirbhay10')}>
//         <View style={styles.linkRow}>
//           <Icon name="github" size={18} color="#fff" style={styles.icon} />
//           <Text style={styles.linkText}>GitHub</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() =>
//           Linking.openURL(
//             'https://www.linkedin.com/in/nirbhay-verma-441695217/',
//           )
//         }>
//         <View style={styles.linkRow}>
//           <Icon name="linkedin" size={18} color="#fff" style={styles.icon} />
//           <Text style={styles.linkText}>LinkedIn</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1c1e',
//     padding: 20,
//     paddingTop: 60,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 16,
//     color: '#ccc',
//     marginBottom: 20,
//   },
//   name: {
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#fff',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   linkRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   linkText: {
//     fontSize: 16,
//     color: '#00aced',
//   },
// });

// export default AboutDeveloperScreen;
