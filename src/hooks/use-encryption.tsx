import sodium from "libsodium-wrappers";

interface EncryptSensorDataResult {
  ciphertext: string;
  nonce: string;
  devicePublicKey: string;
  additionalData?: string;
}

interface EncryptSensorDataResponse {
  cipherText: string;
  nonce: string;
}

export async function encryptSensorData(
  temperature: number,
  humidity: number,
  serverPublicKey: Uint8Array, // Provided by the backend
  deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array } // Reused device key pair
): Promise<EncryptSensorDataResult> {
  try {
    await sodium.ready;

    // Derive shared secret using key exchange (Elliptic Curve Diffie Hellman)
    const sessionKeys = sodium.crypto_kx_client_session_keys(
      deviceKeyPair.publicKey,
      deviceKeyPair.privateKey,
      serverPublicKey
    );

    // Uses the receive key for client-to-server encryption
    const sharedKey = sessionKeys.sharedRx;

    // Derive encryption key using HKDF
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      32, // 256-bit key
      1, // Key ID
      "climate-sensor",
      sharedKey
    );

    // Encrypt data using ChaCha20-Poly1305
    const nonce = sodium.randombytes_buf(
      sodium.crypto_aead_chacha20poly1305_NPUBBYTES
    ); // 12-byte nonce
    const message = JSON.stringify({ temperature, humidity });
    const messageBytes = sodium.from_string(message);

    const ciphertext = sodium.crypto_aead_chacha20poly1305_encrypt(
      messageBytes,
      null,
      null, // nsec (not used)
      nonce,
      derivedKey
    );

    return {
      ciphertext: sodium.to_base64(ciphertext),
      nonce: sodium.to_base64(nonce),
      devicePublicKey: sodium.to_base64(deviceKeyPair.publicKey),
    };
  } catch (error: any) {
    console.log(error);

    throw new Error(`Encryption failed: ${error?.message}`);
  }
}

export const decryptSensorData = async (
  encryptedData: EncryptSensorDataResponse,
  deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array },
  serverPublicKey: Uint8Array
) => {
  try {
    await sodium.ready;

    // Decode inputs
    const ciphertext = sodium.from_base64(encryptedData.cipherText);
    const nonce = sodium.from_base64(encryptedData.nonce);

    // Derive shared secret using key exchange (Elliptic Curve Diffie Hellman)
    const sessionKeys = sodium.crypto_kx_client_session_keys(
      deviceKeyPair.publicKey,
      deviceKeyPair.privateKey,
      serverPublicKey
    );

    // Uses the receive key for client-to-server encryption
    const sharedKey = sessionKeys.sharedRx;

    // Derive encryption key using HKDF
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      32, // 256-bit key
      1, // Key ID
      "climate-sensor",
      sharedKey
    );

    const decryptedBytes = sodium.crypto_aead_chacha20poly1305_decrypt(
      null,
      ciphertext,
      null,
      nonce,
      derivedKey
    );

    // Parse decrypted data
    const decryptedMessage = sodium.to_string(decryptedBytes);
    return JSON.parse(decryptedMessage);
  } catch (error: any) {
    console.log(error);

    throw new Error(`Decryption failed: ${error.message}`);
  }
};
