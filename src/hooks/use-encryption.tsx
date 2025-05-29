import sodium from "libsodium-wrappers";

interface EncryptSensorDataResult {
  ciphertext: string;
  nonce: string;
  devicePublicKey: string;
  salt: string;
  info: string;
  additionalData?: string;
}

export async function encryptSensorData(
  temperature: number,
  humidity: number,
  serverPublicKey: Uint8Array, // Provided by the backend
  deviceKeyPair: { publicKey: Uint8Array; privateKey: Uint8Array }, // Reused device key pair
  info: string = "device-123-session1", // Configurable context
  additionalData?: string // Optional additional authenticated data
): Promise<EncryptSensorDataResult> {
  try {
    // Ensure sodium is ready
    await sodium.ready;

    // 1. Derive shared secret using key exchange
    const sessionKeys = sodium.crypto_kx_client_session_keys(
      deviceKeyPair.publicKey,
      deviceKeyPair.privateKey,
      serverPublicKey
    );

    // Use the receive key for client-to-server encryption
    const sharedKey = sessionKeys.sharedRx;

    // 2. Derive encryption key using HKDF
    const salt = sodium.randombytes_buf(16); // 16-byte salt
    const derivedKey = sodium.crypto_kdf_derive_from_key(
      32, // 256-bit key
      1, // Key ID
      info,
      sharedKey
    );

    // 3. Encrypt data using ChaCha20-Poly1305 (IETF variant)
    const nonce = sodium.randombytes_buf(
      sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES
    ); // 12-byte nonce
    const message = JSON.stringify({ temperature, humidity });
    const messageBytes = sodium.from_string(message);

    // Handle additional authenticated data
    const adBytes = additionalData ? sodium.from_string(additionalData) : null;

    const ciphertext = sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
      messageBytes,
      adBytes,
      null, // nsec (not used)
      nonce,
      derivedKey
    );

    return {
      ciphertext: sodium.to_base64(ciphertext),
      nonce: sodium.to_base64(nonce),
      devicePublicKey: sodium.to_base64(deviceKeyPair.publicKey),
      salt: sodium.to_base64(salt),
      info, // Return as plain string
      ...(additionalData && {
        additionalData: sodium.to_base64(additionalData),
      }), // Include only if provided
    };
  } catch (error: any) {
    throw new Error(`Encryption failed: ${error?.message}`);
  }
}
