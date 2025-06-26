import { Colors } from '@/constants/Colors';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.textTitle}>Login</Text>

      <View style={styles.credentials}>
        <TextInput
          placeholder='Email'
          placeholderTextColor={Colors.dark.text}
          style={[styles.textDefault, styles.inputContainer]}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={Colors.dark.text}
          style={[styles.textDefault, styles.inputContainer]}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            router.replace('/(tabs)');
          }}
          style={styles.button}
        >
          <Text style={styles.textDefault}>Sign in</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.replace('/register');
          }}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.textDefault}>Create a new account</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingInline: 20,
  },
  logo: {
    width: '70%',
    maxHeight: 100,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  textDefault: {
    color: Colors.dark.text,
  },
  textTitle: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  credentials: {
    marginBottom: 24,
    width: '100%',
  },
  inputContainer: {
    justifyContent: 'center',
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 12,
    width: '100%',
    minHeight: 52,
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingInline: 12,
    width: '100%',
    minHeight: 46,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonSecondary: {
    outlineWidth: 1,
    outlineColor: '#000',
    backgroundColor: undefined,
  }
});