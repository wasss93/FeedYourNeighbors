import RNFetchBlob from 'rn-fetch-blob';

const disableSSLVerification = async () => {
  const apiUrl = 'https://localhost:9000/api';

  try {
    const response = await RNFetchBlob.config({
      trusty: true, // Disable SSL verification
    }).fetch('GET', apiUrl);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default disableSSLVerification;
